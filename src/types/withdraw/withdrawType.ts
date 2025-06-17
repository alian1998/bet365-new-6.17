export interface IWithdrawData {
  id: string;
  withdrawMethod: string;
  withdrawChannel: string;
  accountNumber: string;
  amount: number;
  typeAddress: string | null;
  msg: string | null;
  status: string;
  userId: string;
  agentId: string;
  createdAt: string;
  updatedAt: string;
}
