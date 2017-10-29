import { API_SECTION_URI } from '../constants';
import { ISection } from '../components/Scene/SceneContainer';
import BaseSecuredApi from './BaseSecuredApi';
import { ApiSaveResponse } from './BaseApi';

export default class SectionApi {
  static fetchSections(sectionId: number, authToken: string): Promise<Array<ISection>> {
    return BaseSecuredApi.fetchData(`${API_SECTION_URI}/${sectionId}`, authToken);
  }

  static updateSection(
    data: Array<ISection>,
    sectionId: number,
    authToken: string
  ): Promise<ApiSaveResponse> {
    return BaseSecuredApi.updateDataByResourceId(API_SECTION_URI, data, sectionId, authToken);
  }
}
