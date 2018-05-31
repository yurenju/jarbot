import { WalletAddresses, Balances } from './wallet';

export interface ChatProvider {
  sendNotification(
    user: string,
    currency: string,
    amount: string
  ): Promise<object>;

  formatAddresses(addrs: WalletAddresses): object;
  formatBalances(balances: Balances): object;
}
