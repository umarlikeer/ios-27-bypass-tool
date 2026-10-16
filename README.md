# iSuite 27 Pro - NextGen iOS Tool

This project features a modern **iOS 27 visual layout** combined with a **secure V8 bytecode compiler pipeline (`build-secure.js`)** to protect source code from reverse engineering.

---

## 🛠️ Key Features
1. **30% / 70% Layout Split**:
   - **Left 30%**: Dynamic iPhone 27 Visualizer that changes visually when connected / disconnected.
   - **Right 70%**: Data Cards (SN, iCloud, iOS Version), Custom Radio Buttons, Neon Blue Start Button, and OTA Block Toggle Switch.
2. **Security Pipeline (`build-secure.js`)**:
   - Obfuscates JavaScript code using `javascript-obfuscator`.
   - Compiles JS source code directly into **V8 Bytecode (`.jsc`)** using `bytenode`.
3. **Cross-Platform Build Pipeline**:
   - Builds `.exe` on Windows.
   - Builds native macOS `.pkg` and `.dmg` installers.

---

## 🚀 Development & Local Run

```bash
# Install dependencies
npm install

# Run in development mode
npm start
```

---

## 🔒 Step 5: Bytecode Compilation (`build-secure.js`)

To obfuscate and compile `.js` files into `.jsc` binary bytecode:

```bash
npm run build:secure
```

This will take `src/renderer-src.js`, obfuscate it into `src/renderer.js`, and compile it to binary V8 bytecode file `src/renderer.jsc`.

---

## 📦 Packaging Instructions

### 1. Building Windows `.exe` from Windows
```bash
npm run dist:win
```

### 2. How to Build macOS `.pkg` from Windows (GitHub Actions)
Native macOS `.pkg` installers require macOS kernel tools (`pkgbuild`/`productbuild`). When developing on a **Windows host**, you can automatically build `.pkg` using GitHub Actions:

1. Push code or git tag (e.g. `v1.0.0`) to GitHub.
2. The automated GitHub Workflow `.github/workflows/build.yml` will trigger.
3. The `build-macos` runner (`macos-latest`) compiles `.jsc` bytecode and builds the macOS `.pkg` installer.
4. Download your `.pkg` file from the **GitHub Actions Artifacts** section.
