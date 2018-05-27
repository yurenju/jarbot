import { WalletProvider } from '../src/provider/wallet';
import { ChatProvider } from '../src/provider/chat';

export default (chatProvider: ChatProvider, walletProvider: WalletProvider) => {
  return () => {
    return 'notification';
  };
};
