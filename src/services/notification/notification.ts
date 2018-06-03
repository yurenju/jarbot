import { json } from 'micro';
import { IncomingMessage } from 'http';

import { WalletProvider } from 'jarbot-providers/wallet';
import { ChatProvider } from 'jarbot-providers/chat';

export default (chat: ChatProvider, wallet: WalletProvider) => {
  return async (req: IncomingMessage) => {
    const notification: any = await json(req);
    if (notification.type === 'wallet:addresses:new-payment') {
      const tx = await wallet.getTransaction(notification);
      await chat.sendNotification(tx.username, tx.currency, tx.amount);
    }
    return { ok: true };
  };
};
