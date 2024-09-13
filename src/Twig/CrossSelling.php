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

namespace FlexyBundle\Twig;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use TwigEngine\Service\DataAccess\DataAccessService;

#[AsTwigComponent(template: 'components/Layout/CrossSelling/CrossSelling.html.twig')]
class CrossSelling
{
    public string $categoryId;
    private DataAccessService $dataAccessService;

    public function __construct(DataAccessService $dataAccessService)
    {
        $this->dataAccessService = $dataAccessService;
    }

    public function getProducts(): array
    {
        return $this->dataAccessService->resources('/api/front/products', [
            'productCategories.category.id' => $this->categoryId,
            'itemsPerPage' => 3,
        ]);
    }
}
