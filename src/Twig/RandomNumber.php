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

use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent(urlReferenceType: UrlGeneratorInterface::ABSOLUTE_URL)]
class RandomNumber
{
    use DefaultActionTrait;

    #[LiveProp()]
    public int $max = 1000;

    public function getRandomNumber(): int
    {
        return random_int(0, $this->max);
    }
}
