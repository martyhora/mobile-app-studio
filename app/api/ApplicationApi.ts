import { API_APPLICATION_URI } from '../constants';
import BaseApi from './BaseApi';
import { IApplication } from '../components/ApplicationList/ApplicationListContainer';

export default class ApplicationApi {
  static fetchApplications(): Array<IApplication> {
    return BaseApi.fetchData(API_APPLICATION_URI);
  }

  static fetchApplicationById(applicationId: number): IApplication {
    return BaseApi.fetchDataByResourceId(API_APPLICATION_URI, applicationId);
  }

  static updateApplication(
    applicationId: number,
    data: IApplication,
    onDataUpdated: () => void
  ): void {
    BaseApi.updateDataByResourceId(API_APPLICATION_URI, data, applicationId, onDataUpdated);
  }

  static deleteApplication(applicationId: number, onDataDeleted: () => void): void {
    BaseApi.deleteDataByResourceId(API_APPLICATION_URI, applicationId, onDataDeleted);
  }

  static addApplication(data: IApplication, onDataPosted: () => void): void {
    BaseApi.postData(API_APPLICATION_URI, data, onDataPosted);
  }
}
