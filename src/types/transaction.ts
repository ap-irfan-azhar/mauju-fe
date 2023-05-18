import { Meta } from ".";


export interface ITransactionInput {
  description: string;
  name: string;
  type: 'INCOME' | 'EXPENSE' | '';
  amount: number;
}

export interface ITransaction extends ITransactionInput {
  id: string;
  created_at: string;
  updated_at: string;
}


export interface ITransactionList {
  transactions: ITransaction[];
  meta: Meta;
}


