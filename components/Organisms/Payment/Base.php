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

namespace FlexyBundle\Components\Organisms\Payment;

use FlexyBundle\Event\CheckoutEvents;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveArg;
use Symfony\UX\LiveComponent\Attribute\LiveListener;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\ComponentToolsTrait;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Thelia\Api\Service\DataAccess\DataAccessService;
use Thelia\Domain\Cart\CartFacade;
use Thelia\Domain\Checkout\DTO\CheckoutDTO;
use Thelia\Domain\Checkout\Service\ConsentAcceptanceStore;
use Thelia\Domain\Checkout\Service\ConsentProvider;
use Thelia\Domain\Localization\Service\LangService;
use Thelia\Tools\I18n;

#[AsLiveComponent]
class Base
{
    use ComponentToolsTrait;
    use DefaultActionTrait;

    #[LiveProp]
    public ?int $paymentModuleId = null;

    #[LiveProp]
    public ?int $invoiceAddressId = null;

    /**
     * What the buyer has answered so far, by consent code.
     *
     * Mirrors the session store rather than replacing it: the store is what decides
     * whether the order goes through, and it is the one OrderFacade freezes on the
     * order. This is the display state, refilled from the store on mount and after
     * every answer, the way paymentModuleId is refilled from the cart.
     *
     * @var array<string, bool>
     */
    #[LiveProp]
    public array $consentAcceptances = [];

    public function __construct(
        private readonly DataAccessService $dataAccessService,
        private readonly CartFacade $cartFacade,
        private readonly ConsentProvider $consentProvider,
        private readonly ConsentAcceptanceStore $consentAcceptanceStore,
        private readonly LangService $langService,
    ) {
    }

    public function mount(): void
    {
        $this->invoiceAddressId = $this->cartFacade->getInvoiceAddressId();
        $this->paymentModuleId = $this->cartFacade->getPaymentModuleId();
        $this->consentAcceptances = $this->consentAcceptanceStore->all();
    }

    public function getModules(): array
    {
        return $this->dataAccessService->resources('/api/front/payment/modules') ?? [];
    }

    /**
     * The boxes to show, in the order the merchant put them in.
     *
     * The wording comes out as plain text and is printed escaped: a consent is a
     * sentence the buyer agrees to, not a piece of markup a shop administrator can
     * inject into the payment page. The link to the full text is built here instead,
     * from the content the consent points at, and rendered next to the box rather than
     * inside its label — a link nested in a label toggles the box when clicked.
     *
     * @return list<array{code: string, title: string, description: string, url: string|null, mandatory: bool, accepted: bool}>
     */
    public function getConsents(): array
    {
        $locale = (string) $this->langService->getLocale();
        $consents = [];

        foreach ($this->consentProvider->activeConsents() as $consent) {
            $code = (string) $consent->getCode();

            $consents[] = [
                'code' => $code,
                'title' => $this->consentProvider->title($consent, $locale),
                // No fallback wording asked for: an untranslated description is left
                // empty and its paragraph is not rendered at all.
                'description' => (string) I18n::forceI18nRetrieving($locale, 'Consent', $consent->getId(), [])->getDescription(),
                'url' => null !== $consent->getContentId() ? $consent->getContent()?->getUrl($locale) : null,
                'mandatory' => $consent->isMandatory(),
                'accepted' => $this->consentAcceptances[$code] ?? false,
            ];
        }

        return $consents;
    }

    /**
     * Records one answer, and tells the next button to look again.
     *
     * The value to store is passed rather than flipped: the template computes it from
     * the state the server just rendered, so the same call arriving twice — a change
     * event fired by both the box and the label around it — writes the same answer
     * twice instead of undoing itself.
     *
     * A code the shop is not asking for right now is ignored: the answers written back
     * are those of the active consents and nothing else.
     */
    #[LiveAction]
    public function toggleConsent(#[LiveArg] string $code, #[LiveArg] bool $accepted): void
    {
        $acceptances = [];

        foreach ($this->consentProvider->activeConsents() as $consent) {
            $consentCode = (string) $consent->getCode();

            $acceptances[$consentCode] = $consentCode === $code
                ? $accepted
                : $this->consentAcceptanceStore->isAccepted($consentCode);
        }

        $this->consentAcceptanceStore->replace($acceptances);

        $this->consentAcceptances = $this->consentAcceptanceStore->all();

        $this->emit('updateNextButton');
    }

    #[LiveListener(CheckoutEvents::SET_PAYMENT_MODULE_ID)]
    public function selectPaymentModuleId(#[LiveArg] int $moduleId): void
    {
        $this->cartFacade->setPaymentModule(new CheckoutDTO(
            cart: $this->cartFacade->getOrCreateFromSession(),
            paymentModuleId: $moduleId,
        ));

        $this->paymentModuleId = $this->cartFacade->getPaymentModuleId();

        $this->emit('updateNextButton');
    }
}
