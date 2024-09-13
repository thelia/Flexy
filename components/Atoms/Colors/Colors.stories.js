import Colors from './Colors.html.twig';
import colors from './colors.json';

import './colors.css';

export default {
  title: 'Design System/Atoms/Colors'
};

export const list = () => Colors({ colors: colors });
