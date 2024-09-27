<?php

namespace FlexyBundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use TwigEngine\Service\DataAccess\DataAccessService;

#[AsTwigComponent(template: '@components/Organisms/ProductCard/ProductCard.html.twig')]
class ProductCard
{
  private DataAccessService $dataAccessService;
  public ?string $productId;
  public ?array $product;

  public function __construct(DataAccessService $dataAccessService)
  {
    $this->dataAccessService = $dataAccessService;
  }

  public function getProduct()
  {
    if ('' === $this->productId) {
      return null;
    }
    return $this->dataAccessService->resources('/api/front/products/' . $this->productId);
  }
}
