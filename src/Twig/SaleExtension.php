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

namespace FlexyBundle\Twig;

use FlexyBundle\Service\SaleResolver;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class SaleExtension extends AbstractExtension
{
    public function __construct(
        private readonly SaleResolver $saleResolver,
    ) {
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('saleOrNotFound', [$this, 'saleOrNotFound']),
        ];
    }

    /**
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    public function saleOrNotFound(?int $saleId): array
    {
        return $this->saleResolver->getOrFail($saleId);
    }
}
