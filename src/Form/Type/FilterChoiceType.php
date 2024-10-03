<?php

namespace FlexyBundle\Form\Type;

use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FilterChoiceType extends ChoiceType
{
  public function configureOptions(OptionsResolver $resolver): void {}

  public function getParent(): string
  {
    return ChoiceType::class;
  }

  public function getBlockPrefix(): string
  {
    return 'filter';
  }
}
