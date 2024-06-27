const iconsContext = require.context('./assets/icons', false, /\.svg$/);

const icons: { [key: string]: string } = {};

iconsContext.keys().forEach((key: string) => {
  const iconName = key.replace('./', '').replace('.svg', '');
  icons[iconName] = iconsContext(key);
});

export default icons;
