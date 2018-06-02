import fetch from 'node-fetch';
import { IncomingMessage } from 'http';
import formidable from 'formidable';

import { ChatProvider } from './chat';
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

interface Multipart {
  fields: any;
}

function form(req: IncomingMessage): Promise<Multipart> {
  return new Promise(function(resolve, reject) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
      if (err) return reject(err);
      resolve({ fields: fields });
    });
  });
}

export class Slack implements ChatProvider {
  webhookUrl: string;

  constructor(url: string) {
    this.webhookUrl = url;
  }

  async parseCommandRequest(req: IncomingMessage) {
    const { fields } = await form(req);
    const cmd = fields.text.substr(1);
    return {
      name: cmd,
      username: fields.user_name
    };
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
