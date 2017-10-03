import {API_BASE, API_SCENE_URI} from "../constants";
import BaseApi from "./BaseApi";
import {IScene} from "../components/SceneList/SceneListContainer";

export default class SceneApi
{
    static fetchScenesByApplicationId(applicationId: number, onDataFetched: (scenes: Array<IScene>) => void) {
        BaseApi.fetchDataByResourceId(API_SCENE_URI, applicationId, onDataFetched);
    }

    static fetchSceneById(sceneId: number, onDataFetched: (scene: IScene) => void) {
        BaseApi.fetchDataByResourceId(`${API_BASE}scene`, sceneId, onDataFetched);
    }

    static deleteScene(sceneId: number, onDataDeleted: () => void) {
        BaseApi.deleteDataByResourceId(API_SCENE_URI, sceneId, onDataDeleted);
    }

    static updateScene(sceneId: number, data: IScene, onDataUpdated: () => void) {
        BaseApi.updateDataByResourceId(API_SCENE_URI, data, sceneId, onDataUpdated);
    }

    static addScene(data: IScene, onDataPosted: () => void) {
        BaseApi.postData(API_SCENE_URI, data, onDataPosted);
    }

    static fetchScenesForApplicationBySceneId(sceneId: number, onDataFetched: (scenes: Array<IScene>) => void) {
        BaseApi.fetchDataByResourceId(`${API_BASE}/scenes/scenes-to-appliacation`, sceneId, onDataFetched);
    }
}