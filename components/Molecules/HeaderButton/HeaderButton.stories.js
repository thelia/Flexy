import HeaderButton from './HeaderButton.html.twig';

export default {
  title: 'Design System/Molecules/Header Button'
};

export const base = {
  render: (args) =>
    `<div class='block h-[62px] w-[390px] flex'>${HeaderButton(args)}</div>`,
  args: {
    small: false,
    text: 'Connexion',
    subText: '',
    classes: 'HeaderButton--theme',
    icon: 'heart-fill'
  },
  argTypes: {
    classes: {
      options: [
        'HeaderButton--theme',
        'HeaderButton--light',
        'HeaderButton--dark'
      ],
      control: { type: 'select' }
    },
    icon: {
      options: ['heart-fill', 'account', 'account-logged', 'cart'],
      control: { type: 'select' }
    }
  },
  parameters: {}
};
