# frontendconf.ch Relaunch

Based on https://github.com/zeit/next.js/tree/master/examples/with-apollo

## Contribute

### Install and run

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

### Deploy to now.sh

```bash
npm run deploy
```

Set alias from `dev.frontendconf.ch` to latest deployment (you need to be a member of the `frontendconf` organization on https://zeit.co to be able do this):

```bash
npm run alias
```

Set alias from `dev.frontendconf.ch` to specific deployment (replace `efwfjnbisv` with the deployment ID):

```bash
npm run alias frontrelaunch-efwfjnbisv.now.sh dev.frontendconf.ch
```
