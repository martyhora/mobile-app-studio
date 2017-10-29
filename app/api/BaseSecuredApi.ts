import BaseApi from './BaseApi';

export default class BaseSecuredApi {
  static fetchData(apiUri: string, authToken: string): any {
    return BaseApi.fetchData(apiUri, { Authorization: `Bearer ${authToken}` });
  }

  static fetchDataByResourceId(apiUri: string, resourceId: number, authToken: string): any {
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
  ): void {
    BaseSecuredApi.deleteData(`${apiUrl}/${resourceId}`, onDataDeleted, authToken);
  }

  static async updateData(
    apiUri: string,
    data: object,
    onDataUpdated: () => void,
    authToken: string
  ) {
    BaseApi.updateData(apiUri, data, onDataUpdated, { Authorization: `Bearer ${authToken}` });
  }

  static updateDataByResourceId(
    apiUrl: string,
    data: object,
    resourceId: number,
    onDataUpdated: () => void,
    authToken: string
  ): void {
    BaseSecuredApi.updateData(`${apiUrl}/${resourceId}`, data, onDataUpdated, authToken);
  }

  static async postData(apiUri: string, data: object, onDataPosted: () => void, authToken: string) {
    BaseApi.postData(apiUri, data, onDataPosted, { Authorization: `Bearer ${authToken}` });
  }
}
