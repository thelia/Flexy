<?php

namespace FlexyBundle\Twig\Layout;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\Component\Form\FormInterface;
use TwigEngine\Service\DataAccess\DataAccessService;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\TwigComponent\Attribute\ExposeInTemplate;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Symfony\UX\LiveComponent\ComponentWithFormTrait;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use FlexyBundle\Form\Type\FilterChoiceType;

#[AsLiveComponent(template: '@components/Layout/CategoryProducts/CategoryProducts.html.twig')]
class CategoryProducts extends AbstractController
{
  use DefaultActionTrait;
  use ComponentWithFormTrait;

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
  ];

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

  public function __construct(private DataAccessService $dataAccessService) {}

  protected function instantiateForm(): FormInterface
  {
    $formBuilder = $this->createFormBuilder();

    foreach ($this->getFilters() as $filter) {
      $values = [];
      foreach ($filter["values"] as $value) {
        $values[$value["title"]] = $value["value"];
      }
      $formBuilder->add(
        $filter['type'] . "_" . $filter['id'] . "",
        FilterChoiceType::class,
        [
          "label" => $filter['title'],
          'choices' => $values,
          'label' => $filter['title'],
          'required' => false,
          'attr' => ['class' => 'tinymce'],
        ]
      );
    }
    return $formBuilder->getForm();
  }

  #[LiveAction]
  public function save()
  {
    $this->submitForm();
    dd($this->getForm()->getData());
    $this->query = $this->getForm()->getData();
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
}
