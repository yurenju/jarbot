import { ChatProvider } from './chat';
import fetch from 'node-fetch';
import { WalletAddresses, Balances } from './wallet';

function formatToSlackMessage(obj: any): object {
  const fields = Object.keys(obj).map(key => {
    return {
      title: key.toUpperCase(),
      value: obj[key]
    };
  });
  return { attachments: [{ fields }] };
}

export class Slack implements ChatProvider {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  formatBalances(balances: Balances): object {
    return formatToSlackMessage(balances);
  }

  formatAddresses(addrs: WalletAddresses): object {
    return formatToSlackMessage(addrs);
  }

  sendNotification(user: string, currency: string, amount: string) {
    const body = {
      text: `${user}, ${currency}, ${amount}`
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    };

    return fetch(this.url, options).then(res => res.json);
  }
}
