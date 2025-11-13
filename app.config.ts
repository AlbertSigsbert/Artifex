import { ExpoConfig, ConfigContext } from "@expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.albertcodes.aura.dev";
  }

  if (IS_PREVIEW) {
    return "com.albertcodes.aura.preview";
  }

  return "com.albertcodes.aura";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Artifex (Dev)";
  }

  if (IS_PREVIEW) {
    return "Artifex (Preview)";
  }

  return "Artifex";
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "Artifex",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueIdentifier(),
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: getUniqueIdentifier(),
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: ["expo-router",  "expo-font"],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: "d3b62a86-1c81-431e-9e66-f77e84a5810e",
    },
  },
  owner: "albertsigsbert",
});
