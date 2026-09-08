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

namespace FlexyBundle\Exception;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * An address the checkout in hand was never given.
 *
 * Answered as a 404, like everything else the guest checkout turns away: the checkout
 * of one buyer says nothing about what another one wrote, not even that it exists.
 */
class AddressNotInCheckoutException extends NotFoundHttpException
{
    public function __construct(string $message = 'This address does not belong to the checkout in progress.')
    {
        parent::__construct($message);
    }
}
