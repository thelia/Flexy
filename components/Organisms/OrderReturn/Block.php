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

namespace FlexyBundle\Components\Organisms\OrderReturn;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Thelia\Api\Service\DataAccess\DataAccessService;
use Thelia\Domain\Customer\CustomerFacade;
use Thelia\Domain\OrderReturn\Service\ReturnEligibilityChecker;
use Thelia\Model\OrderQuery;

/**
 * The returns of one order, as seen from the customer's order page: the button that
 * opens a new one while the shop still allows it, and the ones already opened.
 *
 * Renders nothing at all when the feature is off — no heading, no empty state — so a
 * shop that never turned returns on looks exactly as it did before.
 */
#[AsTwigComponent]
class Block
{
    public int $orderId = 0;

    public bool $enabled = false;

    public bool $canOpen = false;

    /** @var array<int, array<string, mixed>> */
    public array $returns = [];

    public function __construct(
        private readonly ReturnEligibilityChecker $eligibility,
        private readonly DataAccessService $dataAccessService,
        private readonly CustomerFacade $customerFacade,
    ) {
    }

    public function mount(int $orderId): void
    {
        $this->orderId = $orderId;

        if (!$this->eligibility->isFeatureEnabled()) {
            return;
        }

        $customer = $this->customerFacade->getCurrentCustomer();

        if (null === $customer) {
            return;
        }

        // Scoped to the session customer rather than trusting the caller: the component
        // must stand on its own wherever it is dropped, and the order id travels in the url.
        $order = OrderQuery::create()
            ->filterByCustomerId($customer->getId())
            ->findPk($orderId);

        if (null === $order) {
            return;
        }

        $this->enabled = true;
        $this->canOpen = $this->eligibility->isReturnable($order);

        $returns = $this->dataAccessService->resources('/api/front/account/order_returns', [
            'order.id' => $orderId,
            'order[createdAt]' => 'desc',
        ]);

        $this->returns = \is_array($returns) ? $returns : [];
    }

    /**
     * Whether there is anything to show at all: the button, or a return already opened.
     */
    public function isVisible(): bool
    {
        return $this->enabled && ($this->canOpen || [] !== $this->returns);
    }
}
