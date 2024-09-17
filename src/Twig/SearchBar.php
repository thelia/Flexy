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

use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use TwigEngine\Service\DataAccess\DataAccessService;

#[AsLiveComponent(template: '@components/Molecules/SearchBar/SearchBar.html.twig')]
class SearchBar
{
  use DefaultActionTrait;

  #[LiveProp(writable: true)]
  public string $query = '';

  private DataAccessService $dataAccessService;

  public function __construct(DataAccessService $dataAccessService)
  {
    $this->dataAccessService = $dataAccessService;
  }

  public function getProducts(): array
  {
    if (empty($this->query)) {
      return [];
    }

    return $this->dataAccessService->resources('/api/front/products', ['title' => $this->query, "limit" => 4]);
  }

  public function getCategories(): array
  {
    if (empty($this->query)) {
      return [];
    }

    return $this->dataAccessService->resources('/api/front/categories', ['title' => $this->query, "limit" => 4]);
  }
}
