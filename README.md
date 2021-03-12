# frontconference.com Relaunch

Based on https://github.com/zeit/next.js/tree/master/examples/with-apollo

## Contribute

### Install and run

```bash
yarn
yarn dev
```

### Set up configuration

In order for the Call for Speakers to work, we are authenticating with the Airtable API. Create a `secrets.json` from the `secrets.json.tmpl` template file and insert the relevant data. Ask `thomas@frontconference.com` in case you don't have access to Airtable. Without this file you'll see a `Cannot find module '../../secrets.json'` at some point.

### Deploy to now.sh

```bash
yarn run deploy
```

Set alias from `dev.frontconference.com` to latest deployment (you need to be a member of the `frontendconf` organization on https://zeit.co to be able do this):

```bash
yarn run alias dev.frontconference.com
```

Set alias from `dev.frontconference.com` to specific deployment (replace `efwfjnbisv` with the deployment ID):

```bash
yarn run alias frontrelaunch-efwfjnbisv.now.sh dev.frontconference.com
```

Live deployment: Set alias from `frontconference.com` to specific deployment (replace `efwfjnbisv` with the deployment ID):

```bash
yarn run alias frontrelaunch-efwfjnbisv.now.sh frontconference.com
```
