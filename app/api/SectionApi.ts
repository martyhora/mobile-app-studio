import { API_SECTION_URI } from '../constants';
import BaseApi from './BaseApi';
import { ISection } from '../components/Scene/SceneContainer';

export default class SectionApi {
  static fetchSections(sectionId: number, onDataFetched: (sections: Array<ISection>) => void) {
    BaseApi.fetchData(`${API_SECTION_URI}/${sectionId}`, onDataFetched);
  }

  static updateSection(data: Array<ISection>, sectionId: number, onDataPosted: () => void) {
    BaseApi.updateDataByResourceId(API_SECTION_URI, data, sectionId, onDataPosted);
  }
}
