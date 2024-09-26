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
use Thelia\Api\Resource\Product;

#[AsLiveComponent(template: '@components/Layout/PseSelector/PseSelector.html.twig')]
class PseSelector
{
  use DefaultActionTrait;

  public array $product;

  #[LiveProp(writable: true)]
  public ?string $pseId = null;

  private DataAccessService $dataAccessService;

  public function __construct(DataAccessService $dataAccessService)
  {
    $this->dataAccessService = $dataAccessService;
  }

  public function pse(): array
  {
    if ('' === $this->pseId) {
      return [];
    }
    return $this->dataAccessService->resources('/api/front/product_sale_elements/' . $this->pseId);
  }

  public function defaultPse(): array
  {
    return array_filter($this->product['productSaleElements'], function ($pse) {
      return $pse['isDefault'];
    })[0];
  }
}
