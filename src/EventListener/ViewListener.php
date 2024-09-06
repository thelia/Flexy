<?php

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

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Thelia\Core\EventListener\ViewListener as TheliaViewListener;

class ViewListener implements EventSubscriberInterface
{
    protected readonly Request $request;

    public function __construct(
        protected RequestStack $requestStack,
    ) {
        $this->request = $requestStack->getCurrentRequest();
    }

    public function beforeKernelView(ViewEvent $event): void
    {
        if (null !== $this->request->attributes->get('_live_action')) {
            $this->request->attributes->set(TheliaViewListener::IGNORE_THELIA_VIEW, true);
        }
    }

    /**
     * {@inheritdoc}
     * api.
     */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => [
                ['beforeKernelView', 6],
            ],
        ];
    }
}
