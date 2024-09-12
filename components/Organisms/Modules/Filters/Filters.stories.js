import FilterColorComponent from './FilterColor.html.twig';
import FilterClassicComponent from './FilterClassic.html.twig';
import filterSelectFunction from '../../../Molecules/Filters/FilterSelect/FilterSelect';
import MobileDrawer from '../../../../assets/js/mobileDrawer';

export default {
  title: 'Design System/Organisms/Modules/Filters'
};

export const FilterColor = {
  render: (args) => FilterColorComponent(args),
  play: () => {
    filterSelectFunction();
    MobileDrawer();
  },
  args: {
    options: [
      { value: 1, color: '#6969B3', label: 'State Blue', disabled: true },
      { value: 2, color: '#FFB698', label: 'Vermillon' },
      { value: 3, color: '#767676', label: 'Grey' }
    ]
  },
  argTypes: {}
};
export const FilterClassic = {
  render: (args) => FilterClassicComponent(args),
  play: () => {
    filterSelectFunction();
    MobileDrawer();
  },
  args: {
    options: [
      { value: 1, label: 'S - 34/36' },
      { value: 2, label: 'M - 38/40' },
      { value: 3, label: 'L - 42/44' }
    ],
    isRounded: false
  },
  argTypes: {}
};
