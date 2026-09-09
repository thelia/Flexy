<?php

declare(strict_types=1);

/*
 * This file is part of the Thelia package.
 * http://www.thelia.net
 *
 * (c) OpenStudio <info@thelia.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FlexyBundle\Components\Layouts\SaleShowcase;

use FlexyBundle\DTO\SaleDTO;
use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

/**
 * The page of a reserved-sale operation. The 404 for a missing/forbidden operation is
 * decided before this component ever mounts — by `saleOrNotFound()`
 * (FlexyBundle\Service\SaleResolver), called at the top of sale.html.twig, the way attr()
 * decides it for a category or a brand. This component only shapes the already-resolved
 * payload for its template: title, countdown, product grid.
 */
#[AsTwigComponent]
class Base
{
    public SaleDTO $sale;

    public function mount(array $sale): void
    {
        $this->sale = SaleDTO::fromArray($sale);
    }
}
