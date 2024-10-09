<?php

namespace FlexyBundle\Form\Type;

use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FilterChoiceType extends ChoiceType
{
  public static function getExtendedTypes(): iterable
  {
    return [ChoiceType::class];
  }

  public function getBlockPrefix(): string
  {
    return 'filter';
  }
}
