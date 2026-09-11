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

namespace FlexyBundle\Tests\Unit\DTO;

use FlexyBundle\DTO\ProductDTO;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\TestCase;

/**
 * The rating of a product reaches the theme in the front product payload, and the module
 * that computes it is an option: a shop without it answers a payload that carries neither
 * field, and that payload has to keep deserializing.
 */
#[CoversClass(ProductDTO::class)]
final class ProductRatingDeserializationTest extends TestCase
{
    /**
     * @return array<string, mixed>
     */
    private static function payload(array $rating = []): array
    {
        return array_merge([
            'id' => 42,
            'ref' => 'REF-42',
            'visible' => true,
            'position' => 1,
            'virtual' => false,
            'publicUrl' => '/organic-cotton-t-shirt',
            'i18ns' => ['title' => 'Organic cotton t-shirt'],
            'productSaleElements' => [],
            'productCategories' => [],
        ], $rating);
    }

    public function testAPayloadWithoutTheRatingFieldsDeserializesToNoRating(): void
    {
        $product = ProductDTO::fromArray(self::payload());

        self::assertSame('Organic cotton t-shirt', $product->title);
        self::assertNull($product->ratingAverage);
        self::assertSame(0, $product->ratingCount);
    }

    public function testANullAverageStaysNull(): void
    {
        $product = ProductDTO::fromArray(self::payload(['ratingAverage' => null, 'ratingCount' => 0]));

        self::assertNull($product->ratingAverage);
        self::assertSame(0, $product->ratingCount);
    }

    public function testAnAverageAndACountAreRead(): void
    {
        $product = ProductDTO::fromArray(self::payload(['ratingAverage' => 4.5, 'ratingCount' => 12]));

        self::assertSame(4.5, $product->ratingAverage);
        self::assertSame(12, $product->ratingCount);
    }

    /**
     * API Platform serializes a decimal as a string often enough that the neighbouring
     * fields of the DTO all cast: the average must not reach a template as "4.5".
     */
    public function testTheAverageAndTheCountAreCastFromTheirStringForm(): void
    {
        $product = ProductDTO::fromArray(self::payload(['ratingAverage' => '4.5', 'ratingCount' => '12']));

        self::assertSame(4.5, $product->ratingAverage);
        self::assertSame(12, $product->ratingCount);
    }

    public function testAnAverageWithoutACountFallsBackToZeroReviews(): void
    {
        $product = ProductDTO::fromArray(self::payload(['ratingAverage' => 3.0]));

        self::assertSame(3.0, $product->ratingAverage);
        self::assertSame(0, $product->ratingCount);
    }
}
