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

namespace FlexyBundle\DTO;

/**
 * A reserved-sale operation, as the /api/front/sales payload hands it over. The API
 * skips a null field entirely (skip_null_values), so every read below falls back
 * to a safe default instead of assuming the key is there.
 */
class SaleDTO
{
    public int $id = 0;
    public bool $active = false;
    public string $title = '';
    public string $saleLabel = '';
    public string $chapo = '';
    public string $description = '';
    public string $postscriptum = '';
    public bool $displayInitialPrice = true;
    public bool $shouldDisplayCountdown = false;
    public ?int $countdownRemainingSeconds = null;

    /** @var int[] */
    public array $productIds = [];

    public ?string $publicUrl = null;

    public static function fromArray(array $data): self
    {
        $dto = new self();
        $dto->id = isset($data['id']) ? (int) $data['id'] : 0;
        $dto->active = (bool) ($data['active'] ?? false);
        $dto->displayInitialPrice = (bool) ($data['displayInitialPrice'] ?? true);
        $dto->shouldDisplayCountdown = (bool) ($data['shouldDisplayCountdown'] ?? false);
        $dto->countdownRemainingSeconds = isset($data['countdownRemainingSeconds'])
            ? (int) $data['countdownRemainingSeconds']
            : null;
        $dto->productIds = array_values(array_map(intval(...), (array) ($data['productIds'] ?? [])));
        $dto->publicUrl = isset($data['publicUrl']) ? (string) $data['publicUrl'] : null;

        $dto->title = isset($data['i18ns']['title']) ? (string) $data['i18ns']['title'] : '';
        $dto->saleLabel = isset($data['i18ns']['saleLabel']) ? (string) $data['i18ns']['saleLabel'] : '';
        $dto->chapo = isset($data['i18ns']['chapo']) ? (string) $data['i18ns']['chapo'] : '';
        $dto->description = isset($data['i18ns']['description']) ? (string) $data['i18ns']['description'] : '';
        $dto->postscriptum = isset($data['i18ns']['postscriptum']) ? (string) $data['i18ns']['postscriptum'] : '';

        return $dto;
    }
}
