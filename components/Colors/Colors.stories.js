import Colors from './Colors.twig';
import colors from './colors.json';

import './colors.css';

export default {
  title: 'Example/Colors'
};

export const list = () => Colors({ colors: colors });
