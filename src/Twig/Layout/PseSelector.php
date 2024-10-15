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

namespace FlexyBundle\Twig\Layout;

use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use TwigEngine\Service\DataAccess\DataAccessService;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use TwigEngine\Service\DataAccess\ProductSaleElementsAccessService;
use Symfony\UX\TwigComponent\Attribute\ExposeInTemplate;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveArg;
use Thelia\Controller\Front\BaseFrontController;
use Thelia\Form\Definition\FrontForm;
use Symfony\UX\LiveComponent\ComponentWithFormTrait;
use Symfony\Component\Form\FormInterface;
use TwigEngine\Service\FormService;
use FlexyBundle\Form\Type\FieldsetType;

#[AsLiveComponent(template: '@components/Layout/PseSelector/PseSelector.html.twig')]
class PseSelector extends BaseFrontController
{
  use DefaultActionTrait;
  use ComponentWithFormTrait;

  #[LiveProp]
  public array $product;

  #[ExposeInTemplate]
  public ?array $pses = [];

  #[ExposeInTemplate]
  public ?array $currentPse = null;

  #[LiveProp(writable: true)]
  #[ExposeInTemplate]
  public ?array $currentCombination = null;

  #[ExposeInTemplate]
  public ?array $productAttributes = [];

  #[LiveProp]
  public ?array $initialFormData = null;

  public function __construct(
    private DataAccessService $dataAccessService,
    private ProductSaleElementsAccessService $pseAccessService,
    private FormService $formService
  ) {}

  protected function instantiateForm(): FormInterface
  {
    $form = $this->formService->getFormByName(FrontForm::CART_ADD, [
      "product" => $this->product['id'],
      'product_sale_elements_id' => $this->getCurrentPse()['id'],
      "quantity" => 1,
      'append' => 1,
      'newness' => 1,
    ]);

    $form->add(
      'currentCombination',
      FieldsetType::class,
      [
        'by_reference' => true,
        'label' => 'Filter By',
        'label_attr' => [
          'class' => 'lg:hidden'
        ],
        'inherit_data' => true,
        'attr' => [
          'class' => 'PseSelector'
        ]
      ]
    );

    foreach ($this->getProductAttributes() as $attribute) {
      $choices = [];
      foreach ($attribute['values'] as $value) {
        $choices[$value['label']] = $value['id'];
      }

      $form->get('currentCombination')->add($attribute['id'], ChoiceType::class, [
        'label' => $attribute['label'],
        'choices' => $choices,
        'data' => $this->getCurrentCombination()[$attribute['id']],
        'multiple' => false,
        'required' => false,
      ]);
    };
    return $form;
  }

  public function getPses(): array
  {
    if (0 !== count($this->pses)) {
      return $this->pses;
    }

    $this->pses = json_decode($this->pseAccessService->psesByProduct($this->product['id']), true);

    return $this->pses;
  }

  public function getProductAttributes(): array
  {
    if (0 !== count($this->productAttributes)) {
      return $this->productAttributes;
    }

    $this->productAttributes = $this->pseAccessService->attrAvByProduct($this->product['id']);

    return $this->productAttributes;
  }

  public function getCurrentPse()
  {
    $pses = $this->getPses();

    if (0 === count($pses)) {
      return [];
    }

    if (null !== $this->currentCombination) {
      $matchedPse =  array_filter($pses, function ($pse) {
        return $pse['combination'] == $this->currentCombination;
      });
      $this->currentPse = reset($matchedPse);
    } else {

      $this->currentPse =  array_filter($pses, function ($pse) {
        return $pse['isDefault'];
      })[0];
    }
    $this->formValues['product_sale_elements_id'] = $this->currentPse['id'];
    return $this->currentPse;
  }

  public function getCurrentCombination()
  {
    if (null !== $this->currentCombination) {
      return $this->currentCombination;
    }

    if (null === $this->currentPse) {
      return null;
    }

    $this->currentCombination = $this->currentPse["combination"];

    return $this->currentCombination;
  }

  #[LiveAction]
  public function getQuantity(#[LiveArg] ?int $quantity = 1)
  {
    $this->formValues['quantity'] = $quantity;

    if ($quantity < 2) {
      $this->formValues['quantity'] = 1;
    }

    return  $this->formValues['quantity'];
  }

  #[LiveAction]
  public function addToCart()
  {
    $this->submitForm();
  }

  #[LiveAction]
  public function restockingAlert() {}
}
