import { API_APPLICATION_URI } from '../constants';
import BaseApi from './BaseApi';
import { IApplication } from '../components/ApplicationList/ApplicationListContainer';

export default class ApplicationApi {
  static fetchApplications(onDataFetched: (applications: Array<IApplication>) => void) {
    BaseApi.fetchData(API_APPLICATION_URI, onDataFetched);
  }

  static fetchApplicationById(
    applicationId: number,
    onDataFetched: (application: IApplication) => void
  ) {
    BaseApi.fetchDataByResourceId(API_APPLICATION_URI, applicationId, onDataFetched);
  }

  static updateApplication(applicationId: number, data: IApplication, onDataUpdated: () => void) {
    BaseApi.updateDataByResourceId(API_APPLICATION_URI, data, applicationId, onDataUpdated);
  }

  static deleteApplication(applicationId: number, onDataDeleted: () => void) {
    BaseApi.deleteDataByResourceId(API_APPLICATION_URI, applicationId, onDataDeleted);
  }

  static addApplication(data: IApplication, onDataPosted: () => void) {
    BaseApi.postData(API_APPLICATION_URI, data, onDataPosted);
  }
}
