import { IResponse } from "@/types";
import { ILogin, ILoginResponse, IRegister, IUser } from "@/types/auth";
import axios from "axios";
import Cookie from "js-cookie";
import { apiUrl } from "@/utils/const";
import axiosInstance from "./axios";


export const login = async (data: ILogin): Promise<IResponse<ILoginResponse>> => {
  const response = await axios.post(`${apiUrl}/auth/login`, data);
  Cookie.set('token', response.data.access_token);
  return response.data;
}

export const register = async (data: IRegister): Promise<IResponse<IUser>> => {
  const response = await axios.post(`${apiUrl}/auth/register`, data);
  return response.data;
}

export const me = async (): Promise<IResponse<IUser>> => {
  const response = await axiosInstance.get('/users/me');
  console.log(response.data)
  return response.data;
}
