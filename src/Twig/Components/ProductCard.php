<?php

namespace FlexyBundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use TwigEngine\Service\DataAccess\DataAccessService;
use Symfony\UX\TwigComponent\Attribute\ExposeInTemplate;

#[AsTwigComponent(template: '@components/Organisms/ProductCard/ProductCard.html.twig')]
class ProductCard
{
  private DataAccessService $dataAccessService;
  public ?string $productId = '';

  #[ExposeInTemplate]
  public ?array $product = null;

  public function __construct(DataAccessService $dataAccessService)
  {
    $this->dataAccessService = $dataAccessService;
  }

  public function getProduct()
  {
    if (null !== $this->product) {
      return $this->product;
    }

    if ('' === $this->productId) {
      return null;
    }

    $this->product = $this->dataAccessService->resources('/api/front/products/' . $this->productId);

    return $this->product;
  }
}
