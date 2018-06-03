# jarbot

A messenger bot to show BTC/ETH addresses for shared wallet and notify on a channel when payments received. I use it for a swear jar in a Slack channel.

it only supports coinbase as wallet provider and slack as chat provider, feel free to extend it.

![jarbot features](/assets/features.png)


## Getting Started

### Prerequisites

* Slack incoming webhook URL
* Coinbase API key/secret

#### Slack incoming webhook

incoming webhook for sending messages is necessary, go to https://api.slack.com/apps and click `Create New App` and select your slack room as Development Slack Workspace, then click `Create app`.

Click `Incoming Webhooks` and activate Incoming Webhooks, click `Add New Webhook to Workspace` to get a webhook URL, we will use it later.

#### Coinbase API key

We need coinbase api to create a one-time address to receive ETH/BTC. Follow below steps:

1. register a coinbase account
2. go to `Settings` -> `API Access` -> `+ New API Key`
3. Select two accounts: `BTC Wallet` and `ETH Wallet`
4. Select `wallet:accounts:read`, `wallet:addresses:create` & `wallet:addresses:read` permissions, these 3 permissions can only get your account information & create one-time address for receiving token, should be pretty safe.

Please leave `Notification URL` empty, and we will update it later. Create API key and get API key and secret will use it then.

### Configuration

create `now.json` in:
* `src/services/notification/now.json`
* `src/services/notification/now.json`

with:

```json
{
  "env": {
    "COINBASE_API_KEY": "fill your coinbase api key",
    "COINBASE_API_SECRET": "fill your coinbase api secret",
    "SLACK_WEBHOOK_URL": "fill your slack webhook url"
  }
}
```

### Installing / Building

```shell
$ npm install now -g
$ npm install
$ npm run build
```

then you will get `dist/services/notification/` and `dist/services/slash/` ready to deploy to now.sh.

### Deploy

first, login to now.sh service:

```shell
$ now login
```

second, deploy notification and slash to now.sh:

```shell
$ now --public dist/services/slash
$ now --public dist/services/notification
```

each deployment will get a microservice URL. go back to `slack app page` -> `Slash Commands` and create two command: `/jar` & `/balance` with slash microservice URL.

and also go to `Coinbase API Access` and edit api key to update `Notification URL` to notification microservice URL.

### Usage

go to slack and use `/jar` to create a unique address both for BTC & ETH. e.g., user `bob` use `/jar` will generate two addresses which will be labeled `bob`. so when receiving payments via these addresses, a notification will show `receive payment from bob`.

![jarbot features](/assets/features.png)

## Contributing

There are several ways to contribute to this project:

1. **Find bug**: create an issue in our Github issue tracker.
2. **Fix a bug**: check our issue tracker, leave comments and send a pull request to us to fix a bug.
3. **Make new feature**: leave your idea in the issue tracker and discuss with us then send a pull request!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
