export interface ChatProvider {
  sendNotification(
    user: string,
    currency: string,
    amount: string
  ): Promise<object>;
}
