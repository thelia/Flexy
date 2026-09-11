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

/**
 * The caller opened returns faster than the shop allows. Kept apart from
 * ReturnNotAllowedException: nothing is wrong with the request itself, it only
 * came too soon, and the page says so rather than blaming what was filled in.
 */
final class TooManyReturnRequestsException extends \RuntimeException
{
}
