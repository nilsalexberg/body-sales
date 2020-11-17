# Body Sales (bodysales)

Body Sales App

## Install the dependencies
```bash
yarn
```
### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```
### Build the app for production
```bash
quasar build
```

## Publishing to Store
### Android
#### Debug
```bash
quasar build -m android --debug
```
#### Production
```bash
quasar build -m android
```

### Build icons
#### New icons or compile with quasar/icon-genie already installed
Change ```"build_always": false``` to ```build_always: true``` in ```quasar.extensions.json``` to compile icons
https://github.com/quasarframework/app-extension-icon-genie/blob/dev/README.md

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
