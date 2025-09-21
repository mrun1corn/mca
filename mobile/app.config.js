require('dotenv/config');

const baseConfig = require('./app.json');

const DEFAULT_NAME = 'SavingsMobile';
const DEFAULT_SLUG = 'savings-mobile';

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

module.exports = ({ config }) => {
  const envName = process.env.EXPO_PUBLIC_APP_NAME && process.env.EXPO_PUBLIC_APP_NAME.trim();
  const appName = envName && envName.length ? envName : (config.name || baseConfig.expo?.name || DEFAULT_NAME);
  const baseSlug = config.slug || baseConfig.expo?.slug || DEFAULT_SLUG;
  const derivedSlug = slugify(appName) || baseSlug;

  return {
    ...baseConfig.expo,
    ...config,
    name: appName,
    slug: derivedSlug,
    icon: './assets/icon.png',
    android: {
      ...baseConfig.expo?.android,
      ...config.android,
      adaptiveIcon: {
        backgroundColor: '#2563eb',
        foregroundImage: './assets/adaptive-icon.png',
        ...baseConfig.expo?.android?.adaptiveIcon,
        ...config.android?.adaptiveIcon,
      },
    },
    plugins: config.plugins || baseConfig.expo?.plugins || [['expo-secure-store']],
    extra: {
      ...baseConfig.expo?.extra,
      ...config.extra,
      appName,
    },
  };
};
