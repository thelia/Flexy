import Header from './Header.twig';

import './header.css';

export default {
  title: 'Example/Header'
};

export const twig = () => Header({ testVar: 'foo' });
