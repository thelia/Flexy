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
 * The rating of a product reaches the theme in the front product payload, under the key of the
 * addon that computes it — the core names an addon after its own short class name, so the two
 * fields travel nested in `CommentRating`, the way the colours travel in `ProductColor`. The
 * module is an option: a shop without it answers a payload carrying no such key at all, and
 * that payload has to keep deserializing.
 */
#[CoversClass(ProductDTO::class)]
final class ProductRatingDeserializationTest extends TestCase
{
    /**
     * @return array<string, mixed>
     */
    private static function payload(array $extra = []): array
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
        ], $extra);
    }

    /**
     * @return array<string, mixed>
     */
    private static function rated(array $rating): array
    {
        return self::payload(['CommentRating' => $rating]);
    }

    public function testAPayloadWithoutTheRatingAddonDeserializesToNoRating(): void
    {
        $product = ProductDTO::fromArray(self::payload());

        self::assertSame('Organic cotton t-shirt', $product->title);
        self::assertNull($product->ratingAverage);
        self::assertSame(0, $product->ratingCount);
    }

    public function testANullAverageStaysNull(): void
    {
        $product = ProductDTO::fromArray(self::rated(['ratingAverage' => null, 'ratingCount' => 0]));

        self::assertNull($product->ratingAverage);
        self::assertSame(0, $product->ratingCount);
    }

    public function testAnAverageAndACountAreRead(): void
    {
        $product = ProductDTO::fromArray(self::rated(['ratingAverage' => 4.5, 'ratingCount' => 12]));

        self::assertSame(4.5, $product->ratingAverage);
        self::assertSame(12, $product->ratingCount);
    }

    /**
     * API Platform serializes a decimal as a string often enough that the neighbouring
     * fields of the DTO all cast: the average must not reach a template as "4.5".
     */
    public function testTheAverageAndTheCountAreCastFromTheirStringForm(): void
    {
        $product = ProductDTO::fromArray(self::rated(['ratingAverage' => '4.5', 'ratingCount' => '12']));

        self::assertSame(4.5, $product->ratingAverage);
        self::assertSame(12, $product->ratingCount);
    }

    public function testAnAverageWithoutACountFallsBackToZeroReviews(): void
    {
        $product = ProductDTO::fromArray(self::rated(['ratingAverage' => 3.0]));

        self::assertSame(3.0, $product->ratingAverage);
        self::assertSame(0, $product->ratingCount);
    }

    /**
     * The shape the API actually answers, copied from a shop running the review module: the two
     * fields are nested under the addon key, never at the root of the product. Read flat, they
     * are simply absent and every product looks unrated — which is what this case forbids.
     */
    public function testTheRatingIsReadFromTheAddonKeyTheApiAnswers(): void
    {
        $product = ProductDTO::fromArray([
            'id' => 25,
            'ref' => 'PROD025',
            'visible' => true,
            'position' => 0,
            'virtual' => false,
            'publicUrl' => '/chair.html',
            'i18ns' => ['title' => 'Chair'],
            'productSaleElements' => [],
            'productCategories' => [],
            'CommentRating' => ['ratingAverage' => 4.5, 'ratingCount' => 12],
        ]);

        self::assertSame(4.5, $product->ratingAverage);
        self::assertSame(12, $product->ratingCount);
    }

    /**
     * A shop that runs the module still answers no addon for a product the module knows nothing
     * about: the key is there and empty, and that is not a rating of zero either.
     */
    public function testAnEmptyAddonIsNotARatingOfZero(): void
    {
        $product = ProductDTO::fromArray(self::payload(['CommentRating' => null]));

        self::assertNull($product->ratingAverage);
        self::assertSame(0, $product->ratingCount);
    }
}
