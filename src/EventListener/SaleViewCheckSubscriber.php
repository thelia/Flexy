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

namespace FlexyBundle\EventListener;

use FlexyBundle\Service\SaleResolver;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Thelia\Core\Event\TheliaEvents;
use Thelia\Core\Event\ViewCheckEvent;

/**
 * Turns down the `sale` view before it ever renders, the way core's own
 * `Thelia\Action\Brand::viewCheck()` and `Thelia\Action\Category::viewCheck()` do for
 * theirs — the core dispatches `ViewCheckEvent` generically for whatever view a request
 * names, but ships no listener for `sale`, so the front theme provides one.
 *
 * `ViewRenderer::render()` dispatches this event before it asks the parser to render
 * anything, so throwing here — unlike throwing from inside the Twig render itself —
 * reaches Symfony's normal exception handling directly and answers a clean 404, not a
 * page with nothing on it wrapped in a Twig runtime error.
 */
final readonly class SaleViewCheckSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private SaleResolver $saleResolver,
    ) {
    }

    public function onViewCheck(ViewCheckEvent $event): void
    {
        if ('sale' !== $event->getView()) {
            return;
        }

        $this->saleResolver->getOrFail((int) $event->getViewId());
    }

    public static function getSubscribedEvents(): array
    {
        return [
            TheliaEvents::VIEW_CHECK => 'onViewCheck',
        ];
    }
}
