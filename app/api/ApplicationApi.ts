import { API_APPLICATION_URI } from '../constants';
import BaseSecuredApi from './BaseSecuredApi';
import { IApplication } from '../components/ApplicationList/ApplicationListContainer';

export default class ApplicationApi {
  static fetchApplications(authToken: string): Array<IApplication> {
    return BaseSecuredApi.fetchData(API_APPLICATION_URI, authToken);
  }

  static fetchApplicationById(applicationId: number, authToken: string): IApplication {
    return BaseSecuredApi.fetchDataByResourceId(API_APPLICATION_URI, applicationId, authToken);
  }

  static updateApplication(
    applicationId: number,
    data: IApplication,
    onDataUpdated: () => void,
    authToken: string
  ): void {
    BaseSecuredApi.updateDataByResourceId(
      API_APPLICATION_URI,
      data,
      applicationId,
      onDataUpdated,
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

  static addApplication(data: IApplication, onDataPosted: () => void, authToken: string): void {
    BaseSecuredApi.postData(API_APPLICATION_URI, data, onDataPosted, authToken);
  }
}
