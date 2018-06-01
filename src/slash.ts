import formidable from 'formidable';
import { IncomingMessage } from 'http';

import { WalletProvider } from './providers/wallet';
import { ChatProvider } from './providers/chat';

enum Command {
  Jar = 'jar',
  Balance = 'balance'
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

export default (chat: ChatProvider, wallet: WalletProvider) => {
  return async (req: IncomingMessage, res: any) => {
    let msg: object;
    const { fields } = await form(req);
    const cmd = fields.text.substr(1);

    if (cmd === Command.Jar) {
      msg = chat.formatAddresses(wallet.getWalletAddresses());
    } else {
      msg = chat.formatBalances(wallet.getBalances());
    }

    return msg;
  };
};
