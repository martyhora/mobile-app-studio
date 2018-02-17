import * as React from 'react';
import { IScene } from './SceneListContainer';
import { Link } from 'react-router-dom';
import SceneForm from './SceneForm';
import ScenePreview from './ScenePreview';

interface ISceneProps {
  scene: IScene;
  scenes: Array<IScene>;
  formErrors: Array<string>;
  handleSceneRemove: (sceneIndex: number, sceneId: number) => void;
  handleSceneEdit: (sceneId: number) => void;
  handleSceneSave: (values: IScene) => Promise<void>;
}

const SceneList = ({
  scene,
  scenes,
  formErrors,
  handleSceneRemove,
  handleSceneEdit,
  handleSceneSave,
}: ISceneProps) => (
  <div>
    <div style={{ marginBottom: '20px' }}>
      <button className={`btn btn-info`} data-toggle="modal" data-target="#sceneModal">
        Add scene
      </button>

      <br style={{ clear: 'both' }} />
    </div>
    <div className="row">
      {scenes.map((scene: IScene, i: number) => (
        <div style={{ textAlign: 'center', float: 'left' }} key={i}>
          <Link
            to={`/scene/${scene.id}`}
            key={i}
            className="col-md-3 box box-solid"
            style={{
              width: '200px',
              height: '250px',
              marginLeft: '16px',
              overflow: 'hidden',
            }}
          >
            <ScenePreview sections={scene.sections} />
          </Link>
          <div>{scene.title}</div>
          <span
            className="glyphicon glyphicon-remove"
            title="Remove scene"
            style={{ cursor: 'pointer', fontSize: '20px', marginTop: '8px' }}
            onClick={() => handleSceneRemove(i, scene.id)}
          />
          <span
            className="glyphicon glyphicon-edit"
            title="Edit scene"
            style={{
              cursor: 'pointer',
              fontSize: '20px',
              marginLeft: '7px',
              marginTop: '8px',
            }}
            onClick={() => handleSceneEdit(scene.id)}
            data-toggle="modal"
            data-target="#sceneModal"
          />
        </div>
      ))}
    </div>

    <SceneForm formErrors={formErrors} handleSceneSave={handleSceneSave} initialValues={scene} />
  </div>
);

export default SceneList;
