#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ANDROID_DIR="$ROOT_DIR/android"
SDK_DIR="$ROOT_DIR/.android-sdk"
ENV_FILE="$ROOT_DIR/.env"

cyan() { printf "\033[36m%s\033[0m\n" "$*"; }
green() { printf "\033[32m%s\033[0m\n" "$*"; }
yellow() { printf "\033[33m%s\033[0m\n" "$*"; }
red() { printf "\033[31m%s\033[0m\n" "$*"; }

separator() { printf "\n%s\n" "========================================"; }

separator
cyan "Community Savings — Mobile Build"
separator

# 1) Verify prerequisites
if ! command -v node >/dev/null 2>&1; then red "Node.js (>=18) is required."; exit 1; fi
if ! command -v java >/dev/null 2>&1; then red "Java (JDK 17) is required."; exit 1; fi

JAVA_VER="$(java -version 2>&1 | head -n1 | sed -E 's/.*"([0-9]+)\..*/\1/')"
if [ "${JAVA_VER:-0}" -lt 17 ]; then
  yellow "Detected Java ${JAVA_VER}. JDK 17+ is recommended for Android builds."
fi

# 2) Environment configuration
DEFAULT_API_BASE=${EXPO_PUBLIC_API_BASE:-"http://10.0.2.2:4000/api"}
DEFAULT_APP_NAME=${EXPO_PUBLIC_APP_NAME:-"Community Savings"}
if [ -f "$ENV_FILE" ]; then
  yellow "Current mobile/.env contents:" && cat "$ENV_FILE" && echo ""
  EXISTING_API=$(grep -E '^EXPO_PUBLIC_API_BASE=' "$ENV_FILE" | head -n1 || true)
  EXISTING_NAME=$(grep -E '^EXPO_PUBLIC_APP_NAME=' "$ENV_FILE" | head -n1 || true)
  if [ -n "$EXISTING_API" ]; then DEFAULT_API_BASE=${EXISTING_API#EXPO_PUBLIC_API_BASE=}; fi
  if [ -n "$EXISTING_NAME" ]; then DEFAULT_APP_NAME=${EXISTING_NAME#EXPO_PUBLIC_APP_NAME=}; fi
else
  touch "$ENV_FILE"
fi

PROMPT="1"
if [ ! -t 0 ] || [ "${CI:-}" = "1" ]; then
  PROMPT="0"
fi

if [ "$PROMPT" = "1" ]; then
  yellow "Enter API base (e.g. http://192.168.x.x:4000/api or https://your-domain/api)"
  read -rp "API base [${DEFAULT_API_BASE}]: " API_BASE_INPUT || true
  API_BASE=${API_BASE_INPUT:-$DEFAULT_API_BASE}

  yellow "Enter display name for the app"
  read -rp "App name [${DEFAULT_APP_NAME}]: " APP_NAME_INPUT || true
  APP_NAME=${APP_NAME_INPUT:-$DEFAULT_APP_NAME}
else
  API_BASE=$DEFAULT_API_BASE
  APP_NAME=$DEFAULT_APP_NAME
  yellow "Using API base: $API_BASE"
  yellow "Using app name: $APP_NAME"
fi

# Preserve existing env values while updating lines
TMP_ENV="$(mktemp)"
if [ -s "$ENV_FILE" ]; then
  awk '!/^EXPO_PUBLIC_API_BASE=/ && !/^EXPO_PUBLIC_APP_NAME=/' "$ENV_FILE" > "$TMP_ENV"
fi
echo "EXPO_PUBLIC_API_BASE=$API_BASE" >> "$TMP_ENV"
echo "EXPO_PUBLIC_APP_NAME=$APP_NAME" >> "$TMP_ENV"
newline=$'\n'
# ensure file ends with newline
cat "$TMP_ENV" > "$ENV_FILE"
rm -f "$TMP_ENV"

green "mobile/.env updated"
separator

# 3) Install npm dependencies (optional)
INSTALL_DEPS_FLAG="0"
INSTALL_DEPS_ENV=${INSTALL_DEPS:-}
if [ "$PROMPT" = "1" ]; then
  if [ -d "$ROOT_DIR/node_modules" ]; then
    read -rp "Reinstall mobile npm dependencies? [y/N]: " INSTALL_INPUT || true
    if [[ "$INSTALL_INPUT" =~ ^[Yy]$ ]]; then INSTALL_DEPS_FLAG="1"; fi
  else
    read -rp "Install npm dependencies now? [Y/n]: " INSTALL_INPUT || true
    if [[ "$INSTALL_INPUT" =~ ^[Nn]$ ]]; then INSTALL_DEPS_FLAG="0"; else INSTALL_DEPS_FLAG="1"; fi
  fi
else
  if [ ! -d "$ROOT_DIR/node_modules" ] || [[ "$INSTALL_DEPS_ENV" =~ ^(1|true|yes)$ ]]; then
    INSTALL_DEPS_FLAG="1"
  fi
fi

if [ "$INSTALL_DEPS_FLAG" = "1" ]; then
  cyan "Installing npm dependencies"
  (cd "$ROOT_DIR" && npm install)
  separator
fi

# 4) Optional clean build
CLEAN_FLAG="0"
if [ "$PROMPT" = "1" ]; then
  read -rp "Clean previous Android build artifacts? [y/N]: " CLEAN_INPUT || true
  if [[ "$CLEAN_INPUT" =~ ^[Yy]$ ]]; then CLEAN_FLAG="1"; fi
else
  if [[ "${CLEAN_BUILD:-}" =~ ^(1|true|yes)$ ]]; then CLEAN_FLAG="1"; fi
fi

if [ "$CLEAN_FLAG" = "1" ]; then
  cyan "Cleaning Android build artifacts"
  rm -rf "$ANDROID_DIR/app/build" "$ANDROID_DIR/build" "$ANDROID_DIR/.gradle"
  if [ -x "$ANDROID_DIR/gradlew" ]; then
    (cd "$ANDROID_DIR" && ./gradlew clean --no-daemon || true)
  fi
  separator
fi

# 5) Android SDK (optional local install)
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
    yellow "Skipping local SDK install. Ensure ANDROID_HOME or ANDROID_SDK_ROOT is configured."
  fi
else
  export ANDROID_HOME="$SDK_DIR"
  export ANDROID_SDK_ROOT="$SDK_DIR"
  export PATH="$SDK_DIR/platform-tools:$SDK_DIR/emulator:$SDK_DIR/cmdline-tools/latest/bin:$PATH"
fi
separator

# 6) Expo prebuild for Android
cyan "Running Expo prebuild (Android)"
(cd "$ROOT_DIR" && CI=1 npx expo prebuild --platform android)
separator

# 7) Build selection
yellow "Choose build type"
read -rp "[1] Debug APK  [2] Release APK  (default 2): " BUILD_TYPE
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
separator

green "Build complete: $APK_PATH"
yellow "Install with: adb install -r \"$APK_PATH\""
yellow "Ensure device can reach: $API_BASE"
