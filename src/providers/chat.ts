import { WalletAddresses, Balances } from './wallet';
import { IncomingMessage } from 'http';

export enum CommandType {
  jar = 'jar',
  balance = 'balance'
}

export interface Command {
  name: CommandType;
  username: string;
}

export interface ChatProvider {
  sendNotification(
    user: string,
    currency: string,
    amount: string
  ): Promise<object>;

  parseCommandRequest(req: IncomingMessage): Promise<Command>;
  formatAddresses(addrs: WalletAddresses): object;
  formatBalances(balances: Balances): object;
}
