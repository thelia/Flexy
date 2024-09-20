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

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Symfony\UX\TwigComponent\Attribute\ExposeInTemplate;
use TwigEngine\Service\DataAccess\DataAccessService;

#[AsTwigComponent(template: 'components/Layout/CategoryProduct/CategoryProduct.html.twig')]
class CategoryProduct
{
    private DataAccessService $dataAccessService;
    public string $categoryId;
    public string $page;

    #[ExposeInTemplate]
    private array $products;

    public function __construct(DataAccessService $dataAccessService)
    {
        $this->dataAccessService = $dataAccessService;
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
}
