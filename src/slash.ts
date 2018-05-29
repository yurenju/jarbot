import { WalletProvider } from './provider/wallet';

export default (wallet: WalletProvider) => {
  return () => {
    return 'slash';
  };
};
