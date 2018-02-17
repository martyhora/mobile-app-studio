import { API_AUTH_URI, API_BASE } from '../constants';
import axios, { AxiosResponse } from 'axios';

interface IApiResponse<Payload> {
  success: boolean;
  payload?: Payload;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
}

interface IUserPayload {
  user?: IUser;
}

export type IUserApiResponse = IApiResponse<IUserPayload>;

interface IAuthPayload {
  authToken?: string;
  user?: IUser;
}

export type IApiAuthResponse = IApiResponse<IAuthPayload>;

export class AuthError extends Error {}

export default class AuthApi {
  static async login(username: string, password: string): Promise<IApiAuthResponse> {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: API_AUTH_URI,
      data: { username, password },
    });

    if (!response.data.success) {
      throw new AuthError('Invalid login credentials');
    }

    return response.data;
  }

  static async fetchUser(authToken: string): Promise<IUserApiResponse> {
    const response: AxiosResponse = await axios({
      method: 'get',
      url: `${API_BASE}user`,
      headers: { Authorization: `Bearer ${authToken}` },
    });

    return response.data;
  }
}
