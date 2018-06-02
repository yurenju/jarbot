import formidable from 'formidable';
import { IncomingMessage } from 'http';

import { WalletProvider } from '../../providers/wallet';
import { ChatProvider, CommandType } from '../../providers/chat';

export default (chat: ChatProvider, wallet: WalletProvider) => {
  return async (req: IncomingMessage, res: any) => {
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
