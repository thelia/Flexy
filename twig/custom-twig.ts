import Twig from 'twig';
import IconTwig from './IconTwig.twig';

Twig.extendFunction('svg', (iconName: string): string => {
  return IconTwig({ icon: iconName });
});
