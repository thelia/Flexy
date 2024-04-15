/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{twig,ts,js,json}'],
  theme: {
    extend: {
      colors: {
        'theme-dark': 'var(--theme-dark)',
        theme: 'var(--theme)',
        'theme-medium': 'var(--theme-medium)',
        'theme-light': 'var(--theme-light)',
        'theme-lighter': 'var(--theme-lighter)',
        'theme-lightest': 'var(--theme-lightest)',
        black: 'var(--black)',
        white: 'var(--white)',
        'grey-darker': 'var(--grey-darker)',
        'grey-dark': 'var(--grey-dark)',
        grey: 'var(--grey)',
        'grey-lighter': 'var(--grey-lighter)',
        'grey-lightest': 'var(--grey-lightest)',
        'error-dark': 'var(--error-dark)',
        error: 'var(--error)',
        'error-lighter': 'var(--error-lighter)',
        'error-lightest': 'var(--error-lightest)',
        'success-dark': 'var(--success-dark)',
        success: 'var(--success)',
        'success-lightest': 'var(--success-lightest)',
        warning: 'var(--warning)',
        'warning-lightest': 'var(--warning-lightest)',
        validated: 'var(--validated)',
        'validated-lightest': 'var(--validated-lightest)',
        informative: 'var(--informative)',
        'informative-lightest': 'var(--informative-lightest)',
        processing: 'var(--processing)',
        'processing-lightest': 'var(--processing-lightest)',
        'checkbox-focus': 'var(--checkbox-focus)'
      }
    }
  },
  plugins: []
};
