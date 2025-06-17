export interface ITransaction {
  id: string;
  amount: number;
  createdAt: string;
  depositor: {
    userName: string;
  };
}
