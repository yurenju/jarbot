import formidable from 'formidable';
import { IncomingMessage } from 'http';

import { WalletProvider } from 'jarbot-providers/wallet';
import { ChatProvider, CommandType } from 'jarbot-providers/chat';

export default (chat: ChatProvider, wallet: WalletProvider) => {
  return async (req: IncomingMessage) => {
    let msg: object;
    const cmd = await chat.parseCommandRequest(req);

    if (cmd.name === CommandType.jar) {
      msg = chat.formatAddresses(await wallet.getWalletAddresses(cmd.username));
    } else if (cmd.name === CommandType.balance) {
      msg = chat.formatBalances(await wallet.getBalances());
    }

    return msg;
  };
};
