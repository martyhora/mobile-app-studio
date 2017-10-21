import axios, { AxiosResponse } from 'axios';

export default class BaseApi {
  static async fetchData(apiUri: string): any {
    try {
      const response: AxiosResponse = await axios(apiUri);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static fetchDataByResourceId(apiUri: string, resourceId: number): any {
    return BaseApi.fetchData(`${apiUri}/${resourceId}`);
  }

  static async deleteData(apiUri: string, onDataDeleted: () => void): void {
    try {
      const response: AxiosResponse = await axios.delete(apiUri);

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
    onDataDeleted: () => void
  ): void {
    BaseApi.deleteData(`${apiUrl}/${resourceId}`, onDataDeleted);
  }

  static async updateData(apiUri: string, data: object, onDataUpdated: () => void): void {
    try {
      const response: AxiosResponse = await axios.put(apiUri, data);

      if (response.data.success) {
        onDataUpdated();
      }
    } catch (error) {
      console.log(error);
    }
  }

  static updateDataByResourceId(
    apiUrl: string,
    data: object,
    resourceId: number,
    onDataUpdated: () => void
  ): void {
    BaseApi.updateData(`${apiUrl}/${resourceId}`, data, onDataUpdated);
  }

  static async postData(apiUri: string, data: object, onDataPosted: () => void): void {
    try {
      const response: AxiosResponse = await axios.post(apiUri, data);

      if (response.data.success) {
        onDataPosted();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
