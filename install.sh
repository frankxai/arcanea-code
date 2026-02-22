#!/bin/sh
# Arcanea Realm - AI CLI for creators
# Install: curl -fsSL https://arcanea.ai/install | sh
# Or: curl -fsSL https://raw.githubusercontent.com/frankxai/arcanea-code/dev/install.sh | sh

set -e

REPO="frankxai/arcanea-code"
BINARY_NAME="arcanea-code"

# Detect platform
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

case "$ARCH" in
  x86_64|amd64) ARCH="x64" ;;
  aarch64|arm64) ARCH="arm64" ;;
  *) echo "Unsupported architecture: $ARCH"; exit 1 ;;
esac

case "$OS" in
  linux) PLATFORM="linux" ;;
  darwin) PLATFORM="darwin" ;;
  *) echo "Unsupported OS: $OS. For Windows, use: npm install -g arcanea-code"; exit 1 ;;
esac

# Detect musl vs glibc on Linux
LIBC=""
if [ "$PLATFORM" = "linux" ]; then
  if ldd --version 2>&1 | grep -q musl; then
    LIBC="-musl"
  fi
fi

ASSET_NAME="${BINARY_NAME}-${PLATFORM}-${ARCH}${LIBC}"

# Get latest release
echo "Detecting latest version..."
LATEST=$(curl -fsSL "https://api.github.com/repos/${REPO}/releases/latest" 2>/dev/null | grep '"tag_name"' | sed 's/.*"tag_name": *"\([^"]*\)".*/\1/' || echo "")

if [ -z "$LATEST" ]; then
  echo "Could not detect latest release. Installing from npm instead..."
  if command -v npm >/dev/null 2>&1; then
    npm install -g arcanea-code
    exit 0
  elif command -v bun >/dev/null 2>&1; then
    bun install -g arcanea-code
    exit 0
  else
    echo "Error: No package manager found. Install npm or bun first."
    exit 1
  fi
fi

echo "Installing Arcanea Realm ${LATEST}..."

# Download
if [ "$PLATFORM" = "linux" ]; then
  EXT="tar.gz"
else
  EXT="zip"
fi

DOWNLOAD_URL="https://github.com/${REPO}/releases/download/${LATEST}/${ASSET_NAME}.${EXT}"
TMPDIR=$(mktemp -d)

echo "Downloading ${DOWNLOAD_URL}..."
curl -fsSL "$DOWNLOAD_URL" -o "${TMPDIR}/${ASSET_NAME}.${EXT}"

# Extract
cd "$TMPDIR"
if [ "$EXT" = "tar.gz" ]; then
  tar xzf "${ASSET_NAME}.${EXT}"
else
  unzip -q "${ASSET_NAME}.${EXT}"
fi

# Install
INSTALL_DIR="${HOME}/.local/bin"
mkdir -p "$INSTALL_DIR"
mv "${BINARY_NAME}" "${INSTALL_DIR}/${BINARY_NAME}"
chmod +x "${INSTALL_DIR}/${BINARY_NAME}"

# Cleanup
rm -rf "$TMPDIR"

# Check PATH
if ! echo "$PATH" | grep -q "${INSTALL_DIR}"; then
  echo ""
  echo "Add ${INSTALL_DIR} to your PATH:"
  echo "  export PATH=\"${INSTALL_DIR}:\$PATH\""
  echo ""
  echo "Add this to your ~/.bashrc or ~/.zshrc for persistence."
fi

echo ""
echo "Arcanea Realm ${LATEST} installed successfully!"
echo "Run: ${BINARY_NAME}"
