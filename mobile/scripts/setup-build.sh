#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ANDROID_DIR="$ROOT_DIR/android"
SDK_DIR="$ROOT_DIR/.android-sdk"

cyan() { printf "\033[36m%s\033[0m\n" "$*"; }
green() { printf "\033[32m%s\033[0m\n" "$*"; }
yellow() { printf "\033[33m%s\033[0m\n" "$*"; }
red() { printf "\033[31m%s\033[0m\n" "$*"; }

echo ""
cyan "SavingsMobile — Setup & Build"
echo ""

# 1) Ensure Node & Java
if ! command -v node >/dev/null 2>&1; then red "Node.js is required (v18+)."; exit 1; fi
if ! command -v java >/dev/null 2>&1; then red "Java (JDK 17) is required."; exit 1; fi

JAVA_VER="$(java -version 2>&1 | head -n1 | sed -E 's/.*"([0-9]+)\..*/\1/')"
if [ "${JAVA_VER:-0}" -lt 17 ]; then
  yellow "Detected Java ${JAVA_VER}. JDK 17 is recommended for Android builds."
fi

# 2) API base setup
DEFAULT_API_BASE="http://10.0.2.2:4000/api"
if [ -f "$ROOT_DIR/.env" ]; then
  LINE=$(grep -E '^EXPO_PUBLIC_API_BASE=' "$ROOT_DIR/.env" || true)
  if [ -n "$LINE" ]; then DEFAULT_API_BASE=${LINE#EXPO_PUBLIC_API_BASE=}; fi
fi
echo ""
yellow "Enter API base (e.g. http://192.168.x.x:4000/api or https://your-domain/api)"
read -rp "API base [${DEFAULT_API_BASE}]: " API_BASE
API_BASE=${API_BASE:-$DEFAULT_API_BASE}
echo "EXPO_PUBLIC_API_BASE=$API_BASE" > "$ROOT_DIR/.env"
green "Saved API base to mobile/.env"

# 3) Install npm deps (mobile)
cyan "Installing npm dependencies (mobile/)"; echo ""
(cd "$ROOT_DIR" && npm i)

# 4) Android SDK prompt
echo ""
yellow "Android SDK setup"
if [ ! -d "$SDK_DIR" ]; then
  read -rp "Install local Android SDK under mobile/.android-sdk? [y/N]: " REPLY_SDK
  if [[ "$REPLY_SDK" =~ ^[Yy]$ ]]; then
    cyan "Downloading Android commandline tools..."
    mkdir -p "$SDK_DIR/cmdline-tools"
    curl -fsSL -o /tmp/clt.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
    unzip -q /tmp/clt.zip -d "$SDK_DIR/cmdline-tools"
    mv "$SDK_DIR/cmdline-tools/cmdline-tools" "$SDK_DIR/cmdline-tools/latest"
    rm -f /tmp/clt.zip
    export ANDROID_HOME="$SDK_DIR"
    export ANDROID_SDK_ROOT="$SDK_DIR"
    export PATH="$SDK_DIR/platform-tools:$SDK_DIR/emulator:$SDK_DIR/cmdline-tools/latest/bin:$PATH"
    yes | sdkmanager --licenses || true
    sdkmanager "platform-tools" "build-tools;34.0.0" "platforms;android-34" >/dev/null
    green "Android SDK installed at $SDK_DIR"
  else
    yellow "Skipping local SDK install. Ensure ANDROID_HOME or ANDROID_SDK_ROOT is set."
  fi
else
  export ANDROID_HOME="$SDK_DIR"
  export ANDROID_SDK_ROOT="$SDK_DIR"
  export PATH="$SDK_DIR/platform-tools:$SDK_DIR/emulator:$SDK_DIR/cmdline-tools/latest/bin:$PATH"
fi

# 5) Prebuild (Android)
cyan "Running Expo prebuild (Android)"; echo ""
(cd "$ROOT_DIR" && CI=1 npx expo prebuild --platform android)

# 6) Build mode
echo ""
read -rp "Build type: [1] Debug (APK)  [2] Release (APK) [default 2]: " BUILD_TYPE
BUILD_TYPE=${BUILD_TYPE:-2}

if [ "$BUILD_TYPE" = "1" ]; then
  cyan "Assembling Debug APK"
  (cd "$ANDROID_DIR" && ./gradlew assembleDebug -x lint -x test)
  APK_PATH="$ANDROID_DIR/app/build/outputs/apk/debug/app-debug.apk"
else
  cyan "Assembling Release APK"
  (cd "$ANDROID_DIR" && ./gradlew assembleRelease -x lint -x test)
  APK_PATH="$ANDROID_DIR/app/build/outputs/apk/release/app-release.apk"
fi

echo ""
green "Build complete: $APK_PATH"
echo ""
yellow "Next steps:"
echo "- Uninstall any prior app from device/emulator."
echo "- Install APK: adb install -r \"$APK_PATH\""
echo "- Ensure your device can reach: $API_BASE"

