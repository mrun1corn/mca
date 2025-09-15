SavingsMobile — React Native (Expo)

Overview
- React Native app mirroring the existing web app (Home, People, Deposit, Withdraw, Export, Setup, Login).
- Uses the same REST API with Bearer tokens (API now supports cookies and Authorization headers).
- Stores tokens securely using Expo SecureStore.

Getting Started
- Prereqs: Node 20, Android SDK or Expo Go, Yarn or npm.
- Env: set EXPO_PUBLIC_API_BASE to your API base (e.g. http://10.0.2.2:4000/api for Android emulator).
- Install deps: run `npm i` in `mobile/` (on your machine).
- Start: `npm run start` then press `a` for Android or use Expo Go.

Screens
- Login: email/name + password; stores access/refresh tokens.
- Home: Admin/Accountant dashboard or simplified User view with current balance, total deposits, next EMI, recent activity.
- People: Admin CRUD for members.
- Deposit: Simple deposit or Pay Due modes.
- Withdraw: Create withdraw, split across members, generate dues.
- Export: Links to CSV downloads.
- Setup: Change password, theme toggle (future).

Note
- UI is intentionally close to the web app, adapted to native components and navigation.

