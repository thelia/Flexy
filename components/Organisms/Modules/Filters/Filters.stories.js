import FilterColorComponent from './FilterColor.twig';
import filterSelectFunction from '../../../Molecules/Filters/FilterSelect/FilterSelect';
import MobileDrawer from '../../../../assets/js/mobileDrawer';

export default {
  title: 'Design System/Organisms/Modules/Filters'
};

export const FilterColor = {
  render: (args) =>
    `<div class='max-w-[340px]'>${FilterColorComponent(args)}</div>`,
  play: () => {
    filterSelectFunction();
    MobileDrawer();
  },
  args: {
    options: [
      {
        value: 1,
        label:
          "<span class='colorRounded' data-bg-color='#6969B3'></span>State Blue"
      },
      {
        value: 2,
        label:
          "<span class='colorRounded' data-bg-color='#FFB698'></span>Vermillon"
      },
      {
        value: 3,
        label: "<span class='colorRounded' data-bg-color='#767676'></span>Grey"
      }
    ]
  },
  argTypes: {}
};
