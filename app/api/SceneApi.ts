import { API_BASE, API_SCENE_URI } from '../constants';
import BaseSecuredApi from './BaseSecuredApi';
import { IScene } from '../components/SceneList/SceneListContainer';

export default class SceneApi {
  static fetchScenesByApplicationId(applicationId: number, authToken: string): Array<IScene> {
    return BaseSecuredApi.fetchDataByResourceId(API_SCENE_URI, applicationId, authToken);
  }

  static fetchSceneById(sceneId: number, authToken: string): IScene {
    return BaseSecuredApi.fetchDataByResourceId(`${API_BASE}scene`, sceneId, authToken);
  }

  static deleteScene(sceneId: number, onDataDeleted: () => void, authToken: string): void {
    BaseSecuredApi.deleteDataByResourceId(API_SCENE_URI, sceneId, onDataDeleted, authToken);
  }

  static updateScene(
    sceneId: number,
    data: IScene,
    onDataUpdated: () => void,
    authToken: string
  ): void {
    BaseSecuredApi.updateDataByResourceId(API_SCENE_URI, data, sceneId, onDataUpdated, authToken);
  }

  static addScene(data: IScene, onDataPosted: () => void, authToken: string): void {
    BaseSecuredApi.postData(API_SCENE_URI, data, onDataPosted, authToken);
  }

  static fetchScenesForApplicationBySceneId(sceneId: number, authToken: string): Array<IScene> {
    return BaseSecuredApi.fetchDataByResourceId(
      `${API_BASE}/scenes/scenes-to-appliacation`,
      sceneId,
      authToken
    );
  }
}
