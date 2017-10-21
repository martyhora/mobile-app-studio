import { API_SECTION_URI } from '../constants';
import BaseApi from './BaseApi';
import { ISection } from '../components/Scene/SceneContainer';

export default class SectionApi {
  static fetchSections(sectionId: number): Array<ISection> {
    return BaseApi.fetchData(`${API_SECTION_URI}/${sectionId}`);
  }

  static updateSection(data: Array<ISection>, sectionId: number, onDataPosted: () => void): void {
    BaseApi.updateDataByResourceId(API_SECTION_URI, data, sectionId, onDataPosted);
  }
}
