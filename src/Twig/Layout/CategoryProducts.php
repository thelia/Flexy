<?php

namespace FlexyBundle\Twig\Layout;

use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use TwigEngine\Service\DataAccess\DataAccessService;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\TwigComponent\Attribute\ExposeInTemplate;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent(template: '@components/Layout/CategoryProducts/CategoryProducts.html.twig')]
class CategoryProducts
{
  use DefaultActionTrait;
  public const FILTERS = [
    [
      "id" => 2,
      "title" => "Taille",
      "type" => "attribute",
      "inputType" => "checkbox",
      "visible" => true,
      "values" => [
        [
          "id" => 1,
          "title" => "S",
          "value" => 1
        ],
        [
          "id" => 2,
          "title" => "M",
          "value" => 2
        ],
        [
          "id" => 3,
          "title" => "L",
          "value" => 3
        ]
      ]
    ],
    [
      "id" => 1,
      "title" => "Couleurs",
      "type" => "feature",
      "inputType" => "checkbox",
      "visible" => true,
      "values" => [
        [
          "id" => 4,
          "title" => "Rouge",
          "value" => 4
        ],
        [
          "id" => 5,
          "title" => "Vert",
          "value" => 5
        ],
        [
          "id" => 6,
          "title" => "Bleu",
          "value" => 6
        ]
      ]
    ],
    [
      "id" => 3,
      "title" => "Marques",
      "type" => "brands",
      "inputType" => "radio",
      "visible" => true,
      "values" => [
        [
          "id" => 4,
          "title" => "Rouge",
          "value" => 4
        ],
        [
          "id" => 5,
          "title" => "Vert",
          "value" => 5
        ],
        [
          "id" => 6,
          "title" => "Bleu",
          "value" => 6
        ]
      ]
    ],
  ];

  private DataAccessService $dataAccessService;

  #[LiveProp]
  public int $categoryId;

  #[LiveProp]
  public ?int $page = 1;

  #[ExposeInTemplate]
  public ?array $products = [];

  #[ExposeInTemplate]
  public ?array $filters = [];

  #[LiveProp(writable: true, url: true)]
  #[ExposeInTemplate]
  public ?array $query = [];

  public function __construct(DataAccessService $dataAccessService)
  {
    $this->dataAccessService = $dataAccessService;
  }

  public function getFilters(): array
  {
    $this->filters =  CategoryProducts::FILTERS;
    return $this->filters;
  }

  public function getProducts(): array
  {
    $this->products = $this->dataAccessService->resources('/api/front/products', [
      'productCategories.category.id' => $this->categoryId,
      'itemsPerPage' => 9,
      'page' => $this->page,
    ]);

    return $this->products;
  }

  public function getQuery()
  {
    if (null !== $this->query) {
      return $this->query;
    }
  }


  public function getFOrm()
  {
    $this->form = $this->createForm($thusis->filter);
  }
}
