import SnackBar from './SnackBar.html.twig';

export default {
  title: 'Design System/Organisms/SnackBar'
};

export const base = {
  render: (args) => SnackBar(args),
  args: {
    size: 'small',
    variant: 'error',
    button: 'Bouton',
    text: 'Ici un message d’erreur pour aider l’utilisateur à corriger son erreur.',
    withIcon: true
  },
  argTypes: {
    size: {
      options: ['small', 'large', 'full'],
      control: { type: 'radio' }
    },
    variant: {
      options: [
        'error',
        'warning',
        'validated',
        'informative',
        'neutral-light',
        'neutral-dark'
      ],
      control: { type: 'radio' }
    }
  }
};
