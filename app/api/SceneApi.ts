import { API_BASE, API_SCENE_URI } from '../constants';
import BaseSecuredApi from './BaseSecuredApi';
import { IScene } from '../components/SceneList/SceneListContainer';
import { ApiSaveResponse } from './BaseApi';

export default class SceneApi {
  static fetchScenesByApplicationId(
    applicationId: number,
    authToken: string
  ): Promise<Array<IScene>> {
    return BaseSecuredApi.fetchDataByResourceId(API_SCENE_URI, applicationId, authToken);
  }

  static fetchSceneById(sceneId: number, authToken: string): Promise<IScene> {
    return BaseSecuredApi.fetchDataByResourceId(`${API_BASE}scene`, sceneId, authToken);
  }

  static deleteScene(sceneId: number, onDataDeleted: () => void, authToken: string): void {
    BaseSecuredApi.deleteDataByResourceId(API_SCENE_URI, sceneId, onDataDeleted, authToken);
  }

  static updateScene(sceneId: number, data: IScene, authToken: string): Promise<ApiSaveResponse> {
    return BaseSecuredApi.updateDataByResourceId(API_SCENE_URI, data, sceneId, authToken);
  }

  static addScene(data: IScene, authToken: string): Promise<ApiSaveResponse> {
    return BaseSecuredApi.postData(API_SCENE_URI, data, authToken);
  }

  static fetchScenesForApplicationBySceneId(
    sceneId: number,
    authToken: string
  ): Promise<Array<IScene>> {
    return BaseSecuredApi.fetchDataByResourceId(
      `${API_BASE}/scenes/scenes-to-appliacation`,
      sceneId,
      authToken
    );
  }
}
