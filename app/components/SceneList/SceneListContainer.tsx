import * as React from 'react';
import SceneList from './SceneList';
import { ChangeEvent, FormEvent } from 'react';
import SceneApi from '../../api/SceneApi';
import { ISection } from '../Scene/SceneContainer';
import { connect } from 'react-redux';
import { ApiSaveResponse } from '../../api/BaseApi';

export interface IScene {
  [key: string]: any;
  id?: number;
  applicationId?: number;
  title: string;
  sections: Array<ISection>;
}

interface ISceneListContainerState {
  scenes: Array<IScene>;
  scene: IScene;
  formErrors: Array<string>;
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
    formErrors: [],
  };

  handleParameterChange(parameter: string, e: ChangeEvent<HTMLInputElement>): void {
    let scene: IScene = this.state.scene;

    scene[parameter] = e.currentTarget.value;

    this.setState({ scene });
  }

  async handleSceneEdit(sceneId: number) {
    const scene: IScene = await SceneApi.fetchSceneById(sceneId, this.props.authToken);

    this.setState({ scene });
  }

  async handleSceneSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { title, id } = this.state.scene;

    if (title === '') {
      return;
    }

    let responseData: ApiSaveResponse = null;

    if (!id) {
      responseData = await SceneApi.addScene(
        { title, applicationId: this.props.match.params.id, sections: [] },
        this.props.authToken
      );
    } else {
      responseData = await SceneApi.updateScene(id, this.state.scene, this.props.authToken);
    }

    if (responseData.success === false) {
      this.setState({ formErrors: responseData.errors });

      return;
    }

    this.setState({ scene: defaultScene });

    this.fetchScenes();

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
    const scenes: Array<IScene> = await SceneApi.fetchScenesByApplicationId(
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
        formErrors={this.state.formErrors}
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
