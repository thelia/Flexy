import Twig from 'twig';
import IconTwig from './IconTwig.twig';

Twig.extendFunction('svg', (iconName: string): string => {
  return IconTwig({ icon: iconName });
});

Twig.extend(function (Twig) {
  Twig.filters.trans = function (value) {
    return value;
  };

  Twig.exports.functions.t = function (value) {
    return value;
  };

  Twig.exports.functions.resources = function (value) {
    return value;
  };
});
