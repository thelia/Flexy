import FilterSelect from './FilterSelect.twig';

export default {
  title: 'Design System/Molecules/Filters/FilterSelect'
};

export const Base = {
  render: (args) => FilterSelect(args),
  args: {
    id: "FilterSelect",
    options: [{ id: 1, value: 1, label: "S - 34/36" }, { id: 2, value: 2, label: "M - 38/40" }, { id: 3, value: 3, label: "L - 42/44" }],
  }
};

export const Color = {
  render: (args) => FilterSelect(args),
  args: {
    id: "colorFilterSelect",
    options: [{ id: 1, value: 1, label: "<span class='colorRounded' data-bg-color='#6969B3'></span>State Blue" }, { id: 2, value: 2, label: "<span class='colorRounded' data-bg-color='#FFB698'></span>Vermillon" }, { id: 3, value: 3, label: "<span class='colorRounded' data-bg-color='#767676'></span>Grey" }],
  }
};
