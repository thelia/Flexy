<?php

namespace FlexyBundle\Twig\Layout;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\Component\Form\FormInterface;
use TwigEngine\Service\DataAccess\DataAccessService;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\Attribute\LiveArg;
use Symfony\UX\TwigComponent\Attribute\ExposeInTemplate;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Symfony\UX\LiveComponent\ComponentWithFormTrait;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use FlexyBundle\Form\Type\FilterChoiceType;
use FlexyBundle\Form\Type\SelectChoiceType;
use FlexyBundle\Form\Type\FieldsetType;
use FlexyBundle\Form\Type\SortChoiceType;

#[AsLiveComponent(template: '@components/Layout/CategoryProducts/CategoryProducts.html.twig')]
class CategoryProducts extends AbstractController
{
  use DefaultActionTrait;
  use ComponentWithFormTrait;

  public const FILTERS = [
    [
      'id' => 2,
      'title' => 'Taille',
      'type' => 'attribute',
      'inputType' => 'checkbox',
      'visible' => true,
      'values' => [
        [
          'id' => 1,
          'title' => 'S',
          'value' => 1
        ],
        [
          'id' => 2,
          'title' => 'M',
          'value' => 2
        ],
        [
          'id' => 3,
          'title' => 'L',
          'value' => 3
        ]
      ]
    ],
    [
      'id' => 1,
      'title' => 'Couleurs',
      'type' => 'feature',
      'inputType' => 'checkbox',
      'visible' => true,
      'values' => [
        [
          'id' => 4,
          'title' => 'Rouge',
          'value' => 4
        ],
        [
          'id' => 5,
          'title' => 'Vert',
          'value' => 5
        ],
        [
          'id' => 6,
          'title' => 'Bleu',
          'value' => 6
        ]
      ]
    ],
    [
      'id' => 3,
      'title' => 'Marques',
      'type' => 'brands',
      'inputType' => 'checkbox',
      'visible' => true,
      'values' => [
        [
          'id' => 4,
          'title' => 'Rouge',
          'value' => 4
        ],
        [
          'id' => 5,
          'title' => 'Vert',
          'value' => 5
        ],
        [
          'id' => 6,
          'title' => 'Bleu',
          'value' => 6
        ]
      ]
    ]
  ];

  public const SORTS = [
    [
      'id' => 4,
      'title' => 'Ascending price',
      'value' => 'asc'
    ],
    [
      'id' => 5,
      'title' => 'Descending price',
      'value' => 'desc'
    ]
  ];

  #[LiveProp]
  public int $categoryId;

  #[LiveProp]
  public ?int $page = 1;

  #[ExposeInTemplate]
  public ?array $products = [];

  #[ExposeInTemplate]
  public ?array $filters = [];

  #[ExposeInTemplate]
  public ?array $sorts = [];

  public function __construct(private DataAccessService $dataAccessService) {}

  protected function instantiateForm(): FormInterface
  {
    $formBuilder = $this->createFormBuilder(null, ['attr' => ['class' => 'relative flex flex-col gap-[30px]']]);

    if (!empty($this->getSorts())) {

      $values = [];

      foreach ($this->getSorts() as $sort) {
        $values[$sort['title']] = $sort['value'];
      }

      $formBuilder->add($formBuilder->create(
        'sorts',
        FieldsetType::class,
        [
          'by_reference' => true,
          'label' => 'Sort By',
          'inherit_data' => true,
          'attr' => [
            'class' => 'Category-filter lg:hidden'
          ],
          'label_attr' => [
            'class' => 'block mb-6 h4'
          ],
        ]
      )->add('sort', SortChoiceType::class, [
        'label' => 'Choose',
        'choices' => $values,
        'required' => false,
      ]));
    }

    if (!empty($this->getFilters())) {
      $formBuilder->add($formBuilder->create(
        'filters',
        FieldsetType::class,
        [
          'by_reference' => true,
          'label' => 'Filter By',
          'inherit_data' => true,
          'label_attr' => [
            'class' => 'block mb-6 h4'
          ],
          'attr' => [
            'class' => 'Category-filter'
          ],
        ]
      ));

      foreach ($this->getFilters() as $filter) {
        $values = [];

        foreach ($filter['values'] as $value) {
          $values[$value['title']] = $value['value'];
        }

        $formBuilder->get('filters')->add(
          $filter['type'] . '_' . $filter['id'] . '',
          $filter['inputType'] === 'select' ? SelectChoiceType::class : FilterChoiceType::class,
          [
            'label' => $filter['title'],
            'choices' => $values,
            'multiple' => true,
            'required' => false,
          ]
        );
      }
    }

    return $formBuilder->getForm();
  }

  #[LiveAction]
  public function save(#[LiveArg] ?string $order = 'asc', #[LiveArg] ?bool $reset = false)
  {

    // TODO BACK
    // - créer uns service pour map les entrées du formulaires sur les filtres dispo de l'api
    // - Pour le tri, les maquette nous oblige à les déclarer à l'exterieur du formulaire,
    //   mais on pourrait très bien imaginer en faire un champ.

    $this->submitForm();

    if ($reset) {
      $this->resetForm();
    }

    $this->products = $this->dataAccessService->resources('/api/front/products', [
      'productCategories.category.id' => $this->categoryId,
      'itemsPerPage' => 9,
      'page' => $this->page,
      'order' => [
        'ref' => $order
      ]
    ]);

    return $this->products;
  }

  public function getFilters(): array
  {
    $this->filters =  CategoryProducts::FILTERS;
    return $this->filters;
  }
  public function getSorts(): array
  {
    $this->sorts =  CategoryProducts::SORTS;
    return $this->sorts;
  }

  public function getProducts(): array
  {
    if (empty($this->products)) {
      $this->products = $this->dataAccessService->resources('/api/front/products', [
        'productCategories.category.id' => $this->categoryId,
        'itemsPerPage' => 9,
        'page' => $this->page,
        'order' => [
          'ref' => 'asc'
        ]
      ]);
    }
    return $this->products;
  }
}
