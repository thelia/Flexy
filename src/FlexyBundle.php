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

namespace FlexyBundle;

use Composer\Autoload\ClassLoader;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Component\HttpKernel\Bundle\AbstractBundle;
use Thelia\Core\Template\TemplateDefinition;
use Thelia\Model\ConfigQuery;

class FlexyBundle extends AbstractBundle
{
  public function loadExtension(array $config, ContainerConfigurator $container, ContainerBuilder $builder): void
  {
    $serviceConfigurator = $container->services();

    $resourcePath = THELIA_TEMPLATE_DIR . TemplateDefinition::FRONT_OFFICE_SUBDIR . DS . ConfigQuery::read(TemplateDefinition::FRONT_OFFICE_CONFIG_NAME, 'default') . DS . 'src';

    $serviceConfigurator->load('FlexyBundle\\', $resourcePath)
      ->autowire()
      ->autoconfigure();
  }
}
