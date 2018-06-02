import { ChatProvider } from './chat';
import fetch from 'node-fetch';
import { WalletAddresses, Balances } from './wallet';

function formatToSlackMessage(obj: any): object {
  const fields = Object.keys(obj).map(key => {
    return {
      title: key,
      value: obj[key]
    };
  });
  return { attachments: [{ fields }] };
}

export class Slack implements ChatProvider {
  webhookUrl: string;

  constructor(url: string) {
    this.webhookUrl = url;
  }

  formatBalances(balances: Balances): object {
    return formatToSlackMessage(balances);
  }

  formatAddresses(addrs: WalletAddresses): object {
    return formatToSlackMessage(addrs);
  }

  async sendNotification(user: string, currency: string, amount: string) {
    const body = {
      text: `${user}, ${currency}, ${amount}`
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    };

    const result = await fetch(this.webhookUrl, options).then(res =>
      res.text()
    );
    return { ok: result === 'ok' };
  }
}
