# Staticfy

Staticfy is a lightweight static site boilerplate designed for fast and efficient static site development.

## 🚀 Getting Started

To get started, clone the repository:

```bash
git clone https://github.com/eiacc/staticfy.git
```   

Once cloned, install dependencies and start the development server:

```bash
  bun i && bun dev
```

## ⚙️ Development Workflow

All development should be done within the /src directory.   

If you want to personalize or customize the setup, review and modify the configuration files under **/config/bundle**.   

## 🔄 File Handling & Bundling

During the build process, the following files and directories will be copied directly to the /static directory:

```bash
/src/pages/*
/src/pub/*
/src/index.html
```

Meanwhile, all JavaScript and CSS files under ***/src/assets/scripts/*** and ***/src/assets/styles/*** will be bundled into a single optimized file each — **script.min.js** and **styles.min.css**.

## 📜 Available Scripts

### Development Mode

Run the following command to start the development server:

```bash
  bun dev
```

---

### Mobile Testing (with Tunnel & QR Code)

Pre-reqiusite: [ngrok](https://ngrok.com/) setup.   
For seamless mobile visual testing (also works for desktop preview):

1. Start the local tunnel:

```bash
  bun tunnel
```

2. In a separate terminal, generate a QR code:

```bash
  bun qr
```

3. Scan the QR code on your mobile device to access the live preview.

---

### Production Bundling

```bash
  bun bundle
```

## 📁 Directory Structure

| Directory    | DescriptionSavings |
| ------------ | ------------------ |
| **/src**     | development directory    |
| **/static**  | bundled & optimized code from /src ready for hosting     |
| **/config**  | configuration files for automzation scripts to process bundling optimize, tunneling, and more. |

## 💡 Features

- Automatic bundling of all JavaScript and CSS files into a single file each.
- Static assets and pages copied as-is for simplicity.
- Supports mobile testing via ngrok tunnel and QR code generator.

### Example of Bundled Output:

| Development Files                       | Bundled Output             |
| ----------------------------------------|----------------------------|
| **/src/assets/styles/main.css**         | **/static/styles.min.css** |
| **/src/assets/styles/media.css**        | |
| **/src/assets/styles/accordion.css**    | |
| **/src/assets/styles/fonts.css**        | |
|                                         | |
|                                         | |
| **/src/assets/scripts/main.js**         | **/static/styles.min.css** |
| **/src/assets/scripts/animations.js**   | |
| **/src/assets/scripts/canvas.js**       | |

To learn more about bundle mapping. visit [here](config/bundle/map.ts)
