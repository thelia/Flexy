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

use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use TwigEngine\Service\DataAccess\DataAccessService;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use TwigEngine\Service\DataAccess\ProductSaleElementsAccessService;
use Symfony\UX\TwigComponent\Attribute\ExposeInTemplate;

#[AsLiveComponent(template: '@components/Layout/PseSelector/PseSelector.html.twig')]
class PseSelector
{
  use DefaultActionTrait;

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

  private DataAccessService $dataAccessService;
  private readonly ProductSaleElementsAccessService $pseAccessService;

  public function __construct(DataAccessService $dataAccessService, ProductSaleElementsAccessService $pseAccessService)
  {
    $this->dataAccessService = $dataAccessService;
    $this->pseAccessService = $pseAccessService;
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
    if (null !== $this->currentPse) {
      return $this->currentPse;
    }

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
}
