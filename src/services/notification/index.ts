import { json } from 'micro';
import { IncomingMessage } from 'http';

import { WalletProvider } from '../../providers/wallet';
import { ChatProvider } from '../../providers/chat';

export default (chat: ChatProvider, wallet: WalletProvider) => {
  return async (req: IncomingMessage) => {
    const notification = await json(req);
    const tx = wallet.getTransaction(notification);
    await chat.sendNotification(tx.slackName, tx.currency, tx.amount);
    return { ok: true };
  };
};
