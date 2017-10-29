import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { IScene } from './SceneListContainer';
import ErrorList from '../ErrorList';

interface ISceneProps {
  scene: IScene;
  formErrors: Array<string>;
  handleParameterChange: (parameter: string, e: ChangeEvent<HTMLInputElement>) => void;
  handleSceneSave: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

const SceneForm = ({ scene, formErrors, handleParameterChange, handleSceneSave }: ISceneProps) => (
  <div id="sceneModal" className="modal fade" role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">
            &times;
          </button>
          <h4 className="modal-title">Scene</h4>
        </div>
        <form className="form-horizontal" onSubmit={handleSceneSave}>
          <div className="modal-body">
            <ErrorList errors={formErrors} />

            <div className="box-body">
              <div className="form-group">
                <label htmlFor="inputScene" className="col-sm-2 control-label">
                  Title
                </label>

                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputScene"
                    placeholder="Title"
                    value={scene.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleParameterChange('title', e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="box-footer">
            <input
              type="submit"
              className={`btn btn-info pull-right ${scene.title === '' ? 'disabled' : ''}`}
              value="Save"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default SceneForm;
