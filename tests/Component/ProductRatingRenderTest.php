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

namespace FlexyBundle\Tests\Component;

use PHPUnit\Framework\Attributes\IgnoreDeprecations;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Session\Storage\MockArraySessionStorage;
use Symfony\UX\TwigComponent\ComponentRendererInterface;
use Thelia\Core\HttpFoundation\Session\Session;

/**
 * What the theme puts on the page, rendered through the real component templates: a rating
 * is either shown whole, value and review count included, or not shown at all. Zero stars
 * for a product nobody reviewed is the outcome these tests exist to forbid.
 */
final class ProductRatingRenderTest extends KernelTestCase
{
    private const PRODUCT_PAYLOAD = [
        'id' => 99999,
        'ref' => 'REF-99999',
        'visible' => true,
        'position' => 1,
        'virtual' => false,
        'publicUrl' => '/organic-cotton-t-shirt',
        'i18ns' => ['title' => 'Organic cotton t-shirt'],
        'ProductColor' => ['colors' => []],
        'productCategories' => [],
        'productSaleElements' => [
            [
                'id' => 1,
                'isDefault' => true,
                'promo' => false,
                'newness' => false,
                'productPrices' => [['price' => 25.0, 'promoPrice' => 20.0, 'currency' => 'EUR']],
                'attributeCombinations' => [],
            ],
        ],
    ];

    /**
     * The front API is read through an internal request, and the product card reads it for
     * its visual: without a request on the stack — carrying a session, which the image
     * helper reads — the component fails on the image lookup, long before anything
     * rating-related is rendered.
     */
    protected function setUp(): void
    {
        /** @var RequestStack $requestStack */
        $requestStack = self::getContainer()->get('request_stack');
        $request = Request::create('https://localhost/');
        $request->setSession(new Session(new MockArraySessionStorage()));
        $requestStack->push($request);

        // `lang_code` belongs to the context the Thelia parser hands a page template, and a
        // card formats its price with it. Rendering one component on its own goes through no
        // parser, so the test provides what the page would.
        self::getContainer()->get('twig')->addGlobal('lang_code', 'en');
    }

    private function render(string $component, array $props): string
    {
        /** @var ComponentRendererInterface $renderer */
        $renderer = self::getContainer()->get('ux.twig_component.component_renderer');

        return $renderer->createAndRender($component, $props);
    }

    public function testNoAverageRendersNoRatingAtAll(): void
    {
        $html = $this->render('Molecules:Rating:Base', ['average' => null, 'count' => 0]);

        self::assertSame('', trim($html));
    }

    /**
     * The guard is on both fields, so a payload that answers an average with no review
     * behind it cannot print one either.
     */
    public function testAnAverageWithoutAnyReviewRendersNoRating(): void
    {
        $html = $this->render('Molecules:Rating:Base', ['average' => 4.5, 'count' => 0]);

        self::assertSame('', trim($html));
    }

    public function testAnAverageAndACountRenderTheValueTheStarsAndTheReviewCount(): void
    {
        $html = $this->render('Molecules:Rating:Base', ['average' => 4.5, 'count' => 12]);

        // The decimal separator follows the locale of the shop, the value does not.
        self::assertMatchesRegularExpression('/4[.,]5/', $html);
        self::assertStringContainsString('12', $html);
        self::assertStringContainsString('Rating-reviewCount', $html);
        // Counted on the opening of the class attribute: a half star carries two Score-star
        // classes, and counting the class name alone would count that star twice.
        self::assertSame(5, substr_count($html, 'class="Score-star'), 'five stars, whatever the average');
        self::assertStringContainsString('Score-star--half', $html, 'the half of 4.5 is drawn');
    }

    /**
     * Neither the colour of the stars nor their count is readable by a screen reader, and
     * the core's HTML sanitizer drops aria-* attributes on some rendering paths: the value
     * and the number of reviews are asserted as text of the served markup.
     */
    public function testTheRatingIsReadableAsTextWithoutAnyAriaAttribute(): void
    {
        $html = $this->render('Molecules:Rating:Base', ['average' => 4.5, 'count' => 12]);
        $text = trim(preg_replace('/\s+/', ' ', strip_tags($html)));

        self::assertMatchesRegularExpression('/4[.,]5 out of 5 stars/', $text);
        self::assertStringContainsString('12 Reviews', $text);
    }

    #[IgnoreDeprecations]
    public function testACardWhosePayloadCarriesNoRatingShowsNone(): void
    {
        $html = $this->render('Organisms:ProductCard:Base', ['product' => self::PRODUCT_PAYLOAD]);

        self::assertStringContainsString('Organic cotton t-shirt', $html);
        self::assertStringNotContainsString('Rating', $html);
    }

    /**
     * #[IgnoreDeprecations], here and on the test above: the fixture names a product no shop
     * has, so the taxation resolver answers no taxed price and the card formats null as a
     * currency — a deprecation of the price path, not of the rating, and not this branch's
     * to fix.
     *
     * The product id is deliberately one no shop has: the rating renders from the payload
     * the listing already loaded, so a card never looks its own rating up. Were a second
     * call involved, there would be nothing to find and nothing to show.
     */
    #[IgnoreDeprecations]
    public function testACardShowsTheRatingItsProductCarries(): void
    {
        $html = $this->render('Organisms:ProductCard:Base', [
            'product' => array_merge(self::PRODUCT_PAYLOAD, ['ratingAverage' => 4.5, 'ratingCount' => 12]),
        ]);

        self::assertStringContainsString('Rating-reviewCount', $html);
        self::assertMatchesRegularExpression('/4[.,]5/', $html);
        self::assertStringContainsString('12', $html);
    }
}
