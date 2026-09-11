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

use Composer\Autoload\ClassLoader;
use Symfony\Component\Dotenv\Dotenv;

/*
 * A theme is not an application: it has no vendor/ and no kernel of its own, so its tests
 * run with the autoloader, the PHPUnit and the kernel of the Thelia checkout it is installed
 * in. The host is looked up rather than assumed, because the theme sits at a different depth
 * depending on how it got there:
 *
 *   templates/frontOffice/<theme>/   installed by thelia/installer (the usual case)
 *   vendor/thelia/flexy/             required without the installer plugin
 *
 * THELIA_ROOT wins over both, for a layout neither branch covers.
 */
$themeDir = \dirname(__DIR__);

$candidates = array_filter([
    getenv('THELIA_ROOT') ?: null,
    \dirname($themeDir, 3),
    \dirname($themeDir, 2),
]);

$hostRoot = null;

foreach ($candidates as $candidate) {
    if (is_file($candidate.'/vendor/autoload.php') && is_file($candidate.'/src/Kernel.php')) {
        $hostRoot = $candidate;
        break;
    }
}

if (null === $hostRoot) {
    fwrite(
        \STDERR,
        'The theme test suite needs the Thelia checkout it is installed in: none found from '
        .$themeDir.'. Set THELIA_ROOT to the project directory.'.\PHP_EOL
    );
    exit(1);
}

/** @var ClassLoader $loader */
$loader = require $hostRoot.'/vendor/autoload.php';

// The theme's own tests are not part of the package's autoload: nothing outside this suite
// loads them, and a require-dev section would mean a vendor/ inside the theme.
$loader->addPsr4('FlexyBundle\\Tests\\', __DIR__);

// Same treatment as the core's bootstrap: the generated Propel models of the test database
// live in a cache directory, and the kernel fails to boot without them on the include path.
$propelCacheDir = $hostRoot.'/var/propel/test/model';

if (is_dir($propelCacheDir)) {
    $loader->addPsr4('', $propelCacheDir);
    $loader->addPsr4('TheliaMain\\', $hostRoot.'/var/propel/test/database/TheliaMain');
}

(new Dotenv())->bootEnv($hostRoot.'/.env');

// In test mode Symfony's Dotenv skips .env.local by design, and the database credentials of a
// DDEV or CI checkout live there. Bridged only when nothing else already set them, so
// phpunit.xml, .env.test and the CI environment keep the last word.
if (empty($_SERVER['DATABASE_HOST']) && is_file($hostRoot.'/.env.local')) {
    $localVars = (new Dotenv())->parse((string) file_get_contents($hostRoot.'/.env.local'));

    foreach (['DATABASE_HOST', 'DATABASE_PORT', 'DATABASE_NAME', 'DATABASE_USER', 'DATABASE_PASSWORD'] as $key) {
        if (isset($localVars[$key]) && empty($_SERVER[$key])) {
            $_SERVER[$key] = $_ENV[$key] = $localVars[$key];
        }
    }
}
