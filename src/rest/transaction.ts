import { IResponseList, IResponse } from "@/types";
import axiosInstance from "./axios";
import { ITransaction, ITransactionInput, ITransactionList } from "@/types/transaction";

export const getTransactions = async (): Promise<IResponse<ITransactionList>> => {
  const response = await axiosInstance.get('/transactions');
  return response.data;
}

export const getTransaction = async (id: string) : Promise<IResponse<ITransaction>> => {
  const response = await axiosInstance.get(`/transactions/${id}`);
  return response.data;
}

export const createTransaction = async (data: ITransactionInput): Promise<IResponse<ITransaction>> => {
  console.log(data)
  const response = await axiosInstance.post('/transactions', data);
  return response.data;
}

export const updateTransaction = async (id: string, data: ITransactionInput): Promise<IResponse<any>> => {
  const response = await axiosInstance.put(`/transactions/${id}`, data);
  return response.data;
}

export const deleteTransaction = async (id: string): Promise<IResponse<any>> => {
  const response = await axiosInstance.delete(`/transactions/${id}`);
  return response.data;
}