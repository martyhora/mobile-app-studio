import * as React from 'react';
import SceneList from './SceneList';
import { ChangeEvent } from 'react';
import SceneApi from '../../api/SceneApi';
import { ISection } from '../Scene/SceneContainer';

export interface IScene {
  id?: number;
  title: string;
  sections: Array<ISection>;
}

interface ISceneListContainer {
  scenes: Array<IScene>;
  scene: IScene;
}

interface ISceneListContainerProps {
  match: {
    params: {
      id?: number;
    };
  };
  history: any;
}

const defaultScene = {
  id: null,
  title: '',
  sections: [],
};

export default class SceneListContainer extends React.Component<
  ISceneListContainerProps,
  ISceneListContainer
> {
  constructor() {
    super();

    this.state = {
      scenes: [],
      scene: defaultScene,
    };
  }

  handleParameterChange(parameter: string, e: ChangeEvent<HTMLInputElement>): void {
    let scene: IScene = this.state.scene;

    scene[parameter] = e.currentTarget.value;

    this.setState({ scene });
  }

  async handleSceneEdit(sceneId: number): void {
    const scene = await SceneApi.fetchSceneById(sceneId);

    this.setState({ scene });
  }

  handleSceneSave(): void {
    const { title, id } = this.state.scene;

    if (title === '') {
      return;
    }

    const onSectionSaved = () => {
      this.setState({ scene: defaultScene });

      this.fetchScenes();
    };

    if (!id) {
      SceneApi.addScene(
        { title, applicationId: this.props.match.params.id, sections: [] },
        onSectionSaved
      );
    } else {
      SceneApi.updateScene(id, this.state.scene, onSectionSaved);
    }

    $('#sceneModal').modal('toggle');
  }

  handleSceneRemove(sceneIndex: number, sceneId: number): void {
    SceneApi.deleteScene(sceneId, () => {
      let scenes: Array<IScene> = this.state.scenes;

      scenes.splice(sceneIndex, 1);

      this.setState({ scenes });
    });
  }

  async fetchScenes() {
    const scenes = await SceneApi.fetchScenesByApplicationId(this.props.match.params.id);

    this.setState({ scenes });
  }

  componentDidMount() {
    this.fetchScenes();
  }

  render() {
    return (
      <SceneList
        scenes={this.state.scenes}
        scene={this.state.scene}
        handleParameterChange={this.handleParameterChange.bind(this)}
        handleSceneRemove={this.handleSceneRemove.bind(this)}
        handleSceneSave={this.handleSceneSave.bind(this)}
        handleSceneEdit={this.handleSceneEdit.bind(this)}
      />
    );
  }
}
