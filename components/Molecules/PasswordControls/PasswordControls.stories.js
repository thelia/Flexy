import PasswordControls from './PasswordControls.html.twig';
import FieldInput from '../Fields/FieldInput/FieldInput.html.twig';
import PasswordControlsFunction from './PasswordControls';

export default {
  title: 'Design System/Molecules/PasswordControls'
};

const inputArgs = {
  label: 'Mot de passe',
  name: 'password',
  type: 'password',
  placeholder: '########'
};

export const Base = () => {
  const fieldInputHTML = FieldInput(inputArgs);
  const passwordControlsHTML = PasswordControls();
  return `
    <div class='p-10'>
      <div class='mb-5'>
        ${fieldInputHTML}
      </div>
      ${passwordControlsHTML}
    </div>`;
};

Base.play = () => {
  PasswordControlsFunction();
};
