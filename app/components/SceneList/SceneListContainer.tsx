import * as React from 'react';
import SceneList from './SceneList';
import { ChangeEvent } from 'react';
import SceneApi from '../../api/SceneApi';
import { ISection } from '../Scene/SceneContainer';
import { connect } from 'react-redux';

export interface IScene {
  id?: number;
  applicationId?: number;
  title: string;
  sections: Array<ISection>;
}

interface ISceneListContainerState {
  scenes: Array<IScene>;
  scene: IScene;
}

interface ISceneListContainerProps {
  authToken: string;
  match: {
    params: {
      id?: number;
    };
  };
  history: any;
}

const defaultScene: IScene = {
  id: null,
  title: '',
  sections: [],
};

class SceneListContainer extends React.Component<
  ISceneListContainerProps,
  ISceneListContainerState
> {
  state: ISceneListContainerState = {
    scenes: [],
    scene: defaultScene,
  };

  handleParameterChange(parameter: string, e: ChangeEvent<HTMLInputElement>): void {
    let scene: IScene = this.state.scene;

    scene[parameter] = e.currentTarget.value;

    this.setState({ scene });
  }

  async handleSceneEdit(sceneId: number) {
    const scene = await SceneApi.fetchSceneById(sceneId, this.props.authToken);

    this.setState({ scene });
  }

  handleSceneSave(): void {
    const { title, id } = this.state.scene;

    if (title === '') {
      return;
    }

    const onSectionSaved = (): void => {
      this.setState({ scene: defaultScene });

      this.fetchScenes();
    };

    if (!id) {
      SceneApi.addScene(
        { title, applicationId: this.props.match.params.id, sections: [] },
        onSectionSaved,
        this.props.authToken
      );
    } else {
      SceneApi.updateScene(id, this.state.scene, onSectionSaved, this.props.authToken);
    }

    $('#sceneModal').modal('toggle');
  }

  handleSceneRemove(sceneIndex: number, sceneId: number): void {
    SceneApi.deleteScene(
      sceneId,
      () => {
        let scenes: Array<IScene> = this.state.scenes;

        scenes.splice(sceneIndex, 1);

        this.setState({ scenes });
      },
      this.props.authToken
    );
  }

  async fetchScenes() {
    const scenes = await SceneApi.fetchScenesByApplicationId(
      this.props.match.params.id,
      this.props.authToken
    );

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

export default connect(state => ({
  authToken: state.auth.authToken,
}))(SceneListContainer);
