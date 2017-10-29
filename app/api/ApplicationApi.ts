import { API_APPLICATION_URI } from '../constants';
import BaseSecuredApi from './BaseSecuredApi';
import { IApplication } from '../components/ApplicationList/ApplicationListContainer';
import { ApiSaveResponse } from './BaseApi';

export default class ApplicationApi {
  static fetchApplications(authToken: string): Promise<Array<IApplication>> {
    return BaseSecuredApi.fetchData(API_APPLICATION_URI, authToken);
  }

  static fetchApplicationById(applicationId: number, authToken: string): Promise<IApplication> {
    return BaseSecuredApi.fetchDataByResourceId(API_APPLICATION_URI, applicationId, authToken);
  }

  static updateApplication(
    applicationId: number,
    data: IApplication,
    authToken: string
  ): Promise<ApiSaveResponse> {
    return BaseSecuredApi.updateDataByResourceId(
      API_APPLICATION_URI,
      data,
      applicationId,
      authToken
    );
  }

  static deleteApplication(
    applicationId: number,
    onDataDeleted: () => void,
    authToken: string
  ): void {
    BaseSecuredApi.deleteDataByResourceId(
      API_APPLICATION_URI,
      applicationId,
      onDataDeleted,
      authToken
    );
  }

  static addApplication(data: IApplication, authToken: string): Promise<ApiSaveResponse> {
    return BaseSecuredApi.postData(API_APPLICATION_URI, data, authToken);
  }
}
