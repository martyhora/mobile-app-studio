import axios, { AxiosResponse } from 'axios';

export interface ApiSaveResponse {
  success: boolean;
  errors?: Array<string>;
}

export default class BaseApi {
  static async fetchData(apiUri: string, headers: object = {}): Promise<any> {
    try {
      const response: AxiosResponse = await axios({
        method: 'get',
        url: apiUri,
        headers,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static fetchDataByResourceId(apiUri: string, resourceId: number, headers: object = {}): any {
    return BaseApi.fetchData(`${apiUri}/${resourceId}`, headers);
  }

  static async deleteData(apiUri: string, onDataDeleted: () => void, headers: object = {}) {
    try {
      const response: AxiosResponse = await axios({
        method: 'delete',
        url: apiUri,
        headers,
      });

      if (response.data.success) {
        onDataDeleted();
      }
    } catch (error) {
      console.log(error);
    }
  }

  static deleteDataByResourceId(
    apiUrl: string,
    resourceId: number,
    onDataDeleted: () => void,
    headers = {}
  ): void {
    BaseApi.deleteData(`${apiUrl}/${resourceId}`, onDataDeleted, headers);
  }

  static async updateData(
    apiUri: string,
    data: object,
    headers: object = {}
  ): Promise<ApiSaveResponse> {
    try {
      const response: AxiosResponse = await axios({
        method: 'put',
        url: apiUri,
        headers,
        data,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static updateDataByResourceId(
    apiUrl: string,
    data: object,
    resourceId: number,
    headers: object = {}
  ): Promise<ApiSaveResponse> {
    return BaseApi.updateData(`${apiUrl}/${resourceId}`, data, headers);
  }

  static async postData(
    apiUri: string,
    data: object,
    headers: object = {}
  ): Promise<ApiSaveResponse> {
    try {
      const response: AxiosResponse = await axios({
        method: 'post',
        url: apiUri,
        headers,
        data,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
