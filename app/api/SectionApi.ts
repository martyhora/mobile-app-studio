import { API_SECTION_URI } from '../constants';
import { ISection } from '../components/Scene/SceneContainer';
import BaseSecuredApi from './BaseSecuredApi';

export default class SectionApi {
  static fetchSections(sectionId: number, authToken: string): Array<ISection> {
    return BaseSecuredApi.fetchData(`${API_SECTION_URI}/${sectionId}`, authToken);
  }

  static updateSection(
    data: Array<ISection>,
    sectionId: number,
    onDataPosted: () => void,
    authToken: string
  ): void {
    BaseSecuredApi.updateDataByResourceId(
      API_SECTION_URI,
      data,
      sectionId,
      onDataPosted,
      authToken
    );
  }
}
