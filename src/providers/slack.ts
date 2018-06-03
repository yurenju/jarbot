import fetch from 'node-fetch';
import { IncomingMessage } from 'http';
import formidable from 'formidable';

import { ChatProvider } from './chat';
import { WalletAddresses, Balances } from './wallet';

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
    const cmd = fields.command.substr(1);
    return {
      name: cmd,
      username: fields.user_name
    };
  }

  formatBalances(balances: Balances): object {
    const fields = Object.keys(balances).map(key => {
      return {
        title: key,
        value: balances[key]
      };
    });
    return { response_type: 'in_channel', attachments: [{ fields }] };
  }

  formatAddresses(addrs: WalletAddresses): object {
    const fields = Object.keys(addrs).map(key => {
      return {
        title: key,
        value: addrs[key].address
      };
    });
    return { response_type: 'in_channel', attachments: [{ fields }] };
  }

  async sendNotification(user: string, currency: string, amount: string) {
    const body = {
      text: `🎉 ${user} sent ${amount} ${currency} to jar!!`
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
