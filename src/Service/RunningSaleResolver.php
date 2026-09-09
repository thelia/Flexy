<?php

declare(strict_types=1);

/*
 * This file is part of the Thelia package.
 * http://www.thelia.net
 *
 * (c) OpenStudio <info@thelia.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FlexyBundle\Service;

use Symfony\Contracts\Service\ResetInterface;
use Thelia\Api\Service\DataAccess\DataAccessService;

/**
 * Which running sale operation a product belongs to, for the tag and the countdown a
 * card or a product page shows. `/api/front/sales` is already filtered by the core to
 * what the current visitor is entitled to see, so a card never has to ask the question
 * "am I allowed to show this" — only "is there an operation to show at all".
 *
 * Read once per request: a listing renders a card per product, and each one asking the
 * collection on its own would turn one query into N. Deliberately not readonly: the
 * resolved map is the point of this service, rebuilt fresh under php-fpm on every
 * request; ResetInterface makes that hold under a worker runtime too.
 *
 * @phpstan-type RunningSaleTag array{saleLabel: string, shouldDisplayCountdown: bool, countdownRemainingSeconds: int|null, publicUrl: string|null}
 */
final class RunningSaleResolver implements ResetInterface
{
    /**
     * A generous ceiling rather than the API's own default page size: a shop running
     * more concurrent active operations than this is not the case this resolver is
     * built for, and silently dropping the tail would be worse than over-fetching.
     */
    private const MAX_ACTIVE_SALES = 1000;

    /** @var array<int, RunningSaleTag>|null productId => tag, built once per request */
    private ?array $tagByProductId = null;

    public function __construct(
        private readonly DataAccessService $dataAccessService,
    ) {
    }

    /**
     * @return RunningSaleTag|null null when the product carries no running operation,
     *                             or the operation running on it does not show a label
     */
    public function forProduct(int $productId): ?array
    {
        return $this->map()[$productId] ?? null;
    }

    /**
     * @return array<int, RunningSaleTag>
     */
    private function map(): array
    {
        if (null !== $this->tagByProductId) {
            return $this->tagByProductId;
        }

        $sales = $this->dataAccessService->resources('/api/front/sales', [
            'active' => true,
            'itemsPerPage' => self::MAX_ACTIVE_SALES,
        ]) ?? [];

        $now = new \DateTimeImmutable();

        $map = [];
        foreach ($sales as $sale) {
            // `active` is maintained by a scheduled command (see SaleAudienceExtension) that
            // can lag behind the clock: an operation past its own end date but not yet
            // flipped inactive must not keep advertising a label and a countdown that no
            // longer mean anything. An operation with no end date at all is a standing
            // discount and stays displayed.
            if (null !== ($endDate = $this->endDate($sale)) && $endDate < $now) {
                continue;
            }

            $tag = [
                'saleLabel' => (string) ($sale['i18ns']['saleLabel'] ?? ''),
                'shouldDisplayCountdown' => (bool) ($sale['shouldDisplayCountdown'] ?? false),
                'countdownRemainingSeconds' => isset($sale['countdownRemainingSeconds'])
                    ? (int) $sale['countdownRemainingSeconds']
                    : null,
                'publicUrl' => isset($sale['publicUrl']) ? (string) $sale['publicUrl'] : null,
            ];

            // A label-less operation with no countdown to show has nothing worth putting
            // on a card, so its products are left out of the map entirely. The countdown
            // is not conditioned on the label: naming the discount is optional, asking
            // for a countdown is a setting of its own, and a merchant who only sets the
            // second one still gets it on the cards and the product sheets.
            $showsCountdown = $tag['shouldDisplayCountdown'] && null !== $tag['countdownRemainingSeconds'];

            if ('' === $tag['saleLabel'] && !$showsCountdown) {
                continue;
            }

            foreach ((array) ($sale['productIds'] ?? []) as $productId) {
                // The first operation covering a product wins: the API answers sales
                // ordered by start date, so this keeps the oldest running one, which
                // is the one a shopper is most likely already expecting a discount from.
                $map[(int) $productId] ??= $tag;
            }
        }

        return $this->tagByProductId = $map;
    }

    /**
     * @param array<string, mixed> $sale
     */
    private function endDate(array $sale): ?\DateTimeImmutable
    {
        if (!\is_string($sale['endDate'] ?? null) || '' === $sale['endDate']) {
            return null;
        }

        try {
            return new \DateTimeImmutable($sale['endDate']);
        } catch (\Exception) {
            // An unparsable date is treated as no date at all: the operation stays
            // displayed rather than being silently dropped over a payload surprise.
            return null;
        }
    }

    public function reset(): void
    {
        $this->tagByProductId = null;
    }
}
