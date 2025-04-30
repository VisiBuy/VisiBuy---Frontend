This document clearly communicates its purpose: to guide developers on proper local development and deployment workflow.

---

# 🛠 Development Workflow Guide

This document outlines the proper process for serving the app locally and contributing to the codebase through staging and production environments.

---

## 🔧 Serving the App Locally

By default, the app uses the **development** environment settings.

To start the development server:
```bash
npm run dev
```

If you specifically want to serve using **staging config** (e.g., to test against the staging API):
```bash
npm run dev:staging
```

---

## 🚀 Building the App

To build for **development**:
```bash
npm run build
```

To build for **staging**:
```bash
npm run build:staging
```

To build for **production (live)**:
```bash
npm run build:production
```

⚠️ **Important:**  
- Always run `npm run build:staging` before merging a feature into `staging`.  
- Whenever, it is sure that the updates are ready to go live or to be pushed to master; Always run `npm run build:production` before merging `staging` into `master`.

---

## 🔁 Git Workflow: Contributing to the Codebase

1. **Create a new feature branch from `staging`**:
    ```bash
    git checkout staging
    git pull origin staging
    git checkout -b feature/your-feature-name
    ```

2. **Push your branch**:
    ```bash
    git push origin feature/your-feature-name
    ```

3. **Create a pull request (PR)** to merge your branch into `staging`.

4. After successful testing in staging, create another PR to merge `staging` into `master`.

🚫 **NEVER push directly to `master`.**  
All changes **must** go through the staging branch.

---

## 🌐 Environment File Usage

- `.env.development` and `.env.staging` point to the **test server**.
- `.env.production` points to the **production/live server**.



## 🛑 Environment Handling Rules
- ❌ **Do not edit** `.env.production` unless you are in charge of deployment or explicitly told to do so.



## 📁 Notes

- Environment files and build outputs (`dist`, `.env.*`) are already listed in `.gitignore`.
- Make sure you’re using the correct `.env.*` file for the right mode (`development`, `staging`, or `production`).
- Keep `.env.production` secure and untouched unless necessary.
-Visit the package.json for clear guidelines too.

