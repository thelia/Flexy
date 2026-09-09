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

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Thelia\Api\Service\DataAccess\DataAccessService;

/**
 * Resolves the sale operation `sale.html.twig` is asked to show, or turns down the request.
 *
 * The core already decides who gets to see what: a reserved operation not open to the
 * visitor, or one that no longer exists, answers null from the in-process API call the
 * same way a missing one does. Turning that into a 404 — instead of a page rendered with
 * nothing on it — is this service's whole job.
 *
 * Used from two places that both need it: FlexyBundle\EventListener\SaleViewCheckSubscriber
 * (the actual 404 decision, made before the page ever renders — see that class) and
 * sale.html.twig's own top-level read (the data for the page head, once the check already
 * passed). Kept out of Layouts:SaleShowcase:Base: an exception thrown from inside a nested
 * TwigComponent's render cycle only ever reaches the client as a 500, wrapped in a Twig
 * runtime error — Symfony's exception handling does not unwrap it into the original
 * NotFoundHttpException's status the way it does for one thrown directly from a page
 * template's own `doDisplay()`.
 */
final readonly class SaleResolver
{
    public function __construct(
        private DataAccessService $dataAccessService,
    ) {
    }

    /**
     * @throws NotFoundHttpException when no operation matches, or the visitor is not
     *                               entitled to see it
     */
    public function getOrFail(?int $saleId): array
    {
        if (!$saleId) {
            throw new NotFoundHttpException('No sale operation was addressed.');
        }

        $sale = $this->dataAccessService->resources('/api/front/sales/'.$saleId);

        if (null === $sale) {
            throw new NotFoundHttpException('This sale operation does not exist, or is not open to you.');
        }

        return $sale;
    }
}
