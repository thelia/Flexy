/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import '@components/base.css';

import HeaderScript from '@components/Layout/Header/Header.js';
import MobileDrawer from './js/mobileDrawer';
import filterSelectFunction from '@components/Molecules/Filters/FilterSelect/FilterSelect';
import { quantityButton } from '@components/Molecules/Button/button';
import { slider } from '@js/slider';
import ProductGallery from '@components/Layout/ProductGallery/ProductGallery';
import PasswordControlsFunction from '@components/Molecules/PasswordControls/PasswordControls';
import StepsFunction from '@components/Molecules/Step/Steps.js';
import SearchDropdown from '@react/Molecules/SearchBar/SearchBar';

function main() {
  document.body.classList.remove('no-js');
  HeaderScript();
  MobileDrawer();
  filterSelectFunction();
  quantityButton();
  slider();
  ProductGallery();
  PasswordControlsFunction();
  StepsFunction();
  SearchDropdown();
}

document.addEventListener('DOMContentLoaded', () => {
  main();
});
