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

class ProductDTO
{
    public int $id = 0;
    public string $ref = '';
    public bool $visible = false;
    public int $position = 0;
    public bool $virtual = false;
    public string $title = '';
    public string $chapo = '';
    public string $description = '';
    public string $postscriptum = '';
    public array $colors = [];

    /** @var string[] */
    public array $productCategories = [];

    /** @var ProductSaleElementDTO[] */
    public array $productSaleElements = [];

    public ?string $publicUrl = null;

    /**
     * The average of the accepted reviews of the product, null when it has none. Never 0:
     * a product nobody reviewed has no average, and a zero would read as the worst score
     * there is. Both travel nested under `CommentRating`, the key the core gives an addon
     * (its own short class name), exactly like the colours under `ProductColor` above. The
     * module that computes them is one a shop installs: without it the key is absent from
     * the payload, and the theme has to render all the same.
     */
    public ?float $ratingAverage = null;

    public int $ratingCount = 0;

    public static function fromArray(array $data): self
    {
        $dto = new self();
        $dto->id = isset($data['id']) ? (int) $data['id'] : 0;
        $dto->ref = isset($data['ref']) ? (string) $data['ref'] : '';
        $dto->visible = (bool) ($data['visible'] ?? false);
        $dto->position = isset($data['position']) ? (int) $data['position'] : 0;
        $dto->virtual = (bool) ($data['virtual'] ?? false);
        $dto->colors = isset($data['ProductColor']['colors']) ? (array) $data['ProductColor']['colors'] : [];

        $productCategories = $data['productCategories'] ?? [];
        $dto->productCategories = [];
        if (\is_array($productCategories)) {
            foreach ($productCategories as $entry) {
                if (!\is_array($entry)) {
                    continue;
                }
                $categoryPayload = (isset($entry['category']) && \is_array($entry['category']))
                    ? $entry['category']
                    : $entry;
                $dto->productCategories[] = CategoryDTO::fromArray($categoryPayload);
            }
        }

        $dto->productSaleElements = array_values(
            array_map(
                static fn (array $row) => ProductSaleElementDTO::fromArray($row),
                (array) ($data['productSaleElements'] ?? [])
            )
        );

        $dto->title = isset($data['i18ns']['title']) ? (string) $data['i18ns']['title'] : '';
        $dto->chapo = isset($data['i18ns']['chapo']) ? (string) $data['i18ns']['chapo'] : '';
        $dto->description = isset($data['i18ns']['description']) ? (string) $data['i18ns']['description'] : '';
        $dto->postscriptum = isset($data['i18ns']['postscriptum']) ? (string) $data['i18ns']['postscriptum'] : '';
        $dto->publicUrl = isset($data['publicUrl']) ? (string) $data['publicUrl'] : null;
        $dto->ratingAverage = isset($data['CommentRating']['ratingAverage']) ? (float) $data['CommentRating']['ratingAverage'] : null;
        $dto->ratingCount = isset($data['CommentRating']['ratingCount']) ? (int) $data['CommentRating']['ratingCount'] : 0;

        return $dto;
    }

    public static function fromCollection(array $items): array
    {
        return array_values(
            array_map(
                static fn (array $item) => self::fromArray($item),
                $items
            )
        );
    }
}
