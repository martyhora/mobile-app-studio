import { API_BASE, API_SCENE_URI } from '../constants';
import BaseApi from './BaseApi';
import { IScene } from '../components/SceneList/SceneListContainer';

export default class SceneApi {
  static fetchScenesByApplicationId(applicationId: number): Array<IScene> {
    return BaseApi.fetchDataByResourceId(API_SCENE_URI, applicationId);
  }

  static fetchSceneById(sceneId: number): IScene {
    return BaseApi.fetchDataByResourceId(`${API_BASE}scene`, sceneId);
  }

  static deleteScene(sceneId: number, onDataDeleted: () => void): void {
    BaseApi.deleteDataByResourceId(API_SCENE_URI, sceneId, onDataDeleted);
  }

  static updateScene(sceneId: number, data: IScene, onDataUpdated: () => void): void {
    BaseApi.updateDataByResourceId(API_SCENE_URI, data, sceneId, onDataUpdated);
  }

  static addScene(data: IScene, onDataPosted: () => void): void {
    BaseApi.postData(API_SCENE_URI, data, onDataPosted);
  }

  static fetchScenesForApplicationBySceneId(sceneId: number): Array<IScene> {
    return BaseApi.fetchDataByResourceId(`${API_BASE}/scenes/scenes-to-appliacation`, sceneId);
  }
}
