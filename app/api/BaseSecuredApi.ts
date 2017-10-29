import BaseApi, { ApiSaveResponse } from './BaseApi';

export default class BaseSecuredApi {
  static fetchData(apiUri: string, authToken: string): Promise<any> {
    return BaseApi.fetchData(apiUri, { Authorization: `Bearer ${authToken}` });
  }

  static fetchDataByResourceId(
    apiUri: string,
    resourceId: number,
    authToken: string
  ): Promise<any> {
    return BaseSecuredApi.fetchData(`${apiUri}/${resourceId}`, authToken);
  }

  static async deleteData(apiUri: string, onDataDeleted: () => void, authToken: string) {
    BaseApi.deleteData(apiUri, onDataDeleted, { Authorization: `Bearer ${authToken}` });
  }

  static deleteDataByResourceId(
    apiUrl: string,
    resourceId: number,
    onDataDeleted: () => void,
    authToken: string
  ) {
    BaseSecuredApi.deleteData(`${apiUrl}/${resourceId}`, onDataDeleted, authToken);
  }

  static async updateData(
    apiUri: string,
    data: object,
    authToken: string
  ): Promise<ApiSaveResponse> {
    return BaseApi.updateData(apiUri, data, { Authorization: `Bearer ${authToken}` });
  }

  static updateDataByResourceId(
    apiUrl: string,
    data: object,
    resourceId: number,
    authToken: string
  ): Promise<ApiSaveResponse> {
    return BaseSecuredApi.updateData(`${apiUrl}/${resourceId}`, data, authToken);
  }

  static postData(apiUri: string, data: object, authToken: string): Promise<ApiSaveResponse> {
    return BaseApi.postData(apiUri, data, { Authorization: `Bearer ${authToken}` });
  }
}
