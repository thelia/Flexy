// @ts-ignore
import Twig from 'twig';
// @ts-ignore
import IconTwig from './IconTwig.twig';

Twig.extendFunction('ux_icon', (iconName: string): string => {
  return IconTwig({ icon: iconName });
});

Twig.extend(function (Twig: any) {
  Twig.filters.trans = function (value: any) {
    return value;
  };

  Twig.exports.functions.t = function (value: any) {
    return value;
  };

  Twig.exports.functions.resources = function (value: any) {
    return value;
  };
});
