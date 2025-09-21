SavingsMobile — React Native (Expo)

Overview
- React Native (Expo) client mirroring the web dashboard (Home, People, Deposit, Withdraw, Export, Setup, Login).
- Uses the shared REST API with Bearer tokens (cookie + header auth supported backend-side).
- Secure token storage via Expo SecureStore and automatic login when tokens already exist.
- Configurable branding: app name, icons, and theme match the web experience.

Getting Started
- Prereqs: Node 20, Android SDK or Expo Go, Yarn or npm.
- Copy/create `.env`:
  ```env
  EXPO_PUBLIC_API_BASE="http://10.0.2.2:4000/api"  # emulator localhost
  EXPO_PUBLIC_APP_NAME="Community Savings"
  ```
- Install deps: `npm install`
- Run dev server: `npm run start` then press `a` for Android, `w` for web, or scan QR with Expo Go.
- One-time login: app skips the login screen on subsequent launches until the user logs out from Settings.

Screens
- Login: identifier + password; persists access/refresh tokens securely.
- Home: role-aware dashboards (admin/accountant vs member) with dues preview and quick actions.
- People: admin CRUD for members (search, create, edit, delete).
- Deposit: simple or pay-due flows with penalty toggles and suggested installments.
- Withdraw: record cash-outs, define repayment months/rate, exclude members from split.
- Export: CSV download shortcuts with optional date/member filters.
- Setup: theme mode selector, change password, and logout button.

Branding & Assets
- `app.config.js` pulls `EXPO_PUBLIC_APP_NAME` to set the bundle name/slug.
- Launcher icons live in `assets/icon.png` and `assets/adaptive-icon.png`; replace them with your own artwork as needed.

Building for Release
- Recommended: use Expo Application Services (EAS).
  ```bash
  npm install -g eas-cli
  eas login
  eas build:configure
  EXPO_PUBLIC_APP_NAME="Community Savings" eas build --platform android   # produces AAB/APK
  ```
- Sideloaded APKs may trigger Play Protect warnings; publishing through Google Play removes the prompt.
  - For bare Gradle builds (`./gradlew assembleRelease`), export `EXPO_PUBLIC_APP_NAME` in the same shell so the Android `app_name` matches your branding.

Future Enhancements
- Offline-first caching + mutation queue (planned).
- Toast-based feedback for API errors/successes.
- Automated testing (Jest/RNTL + Detox) and CI release pipeline.
