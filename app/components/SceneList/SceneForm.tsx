import * as React from 'react';
import { IScene } from './SceneListContainer';
import ErrorList from '../ErrorList';
import { Field, formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

interface ISceneProps {
  formErrors: Array<string>;
  handleSceneSave: (values: IScene) => Promise<void>;
}

interface ISceneStateProps {
  scene: IScene;
}

const SceneForm = ({
  scene,
  formErrors,
  handleSceneSave,
  initialValues,
  handleSubmit,
  submitting,
}: InjectedFormProps<IScene> & ISceneProps & ISceneStateProps) => (
  <div id="sceneModal" className="modal fade" role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">
            &times;
          </button>
          <h4 className="modal-title">Scene</h4>
        </div>
        <form
          className="form-horizontal"
          onSubmit={handleSubmit((values: IScene) => {
            handleSceneSave(values);
          })}
        >
          <div className="modal-body">
            <ErrorList errors={formErrors} />

            <div className="box-body">
              <div className="form-group">
                <label htmlFor="inputScene" className="col-sm-2 control-label">
                  Title
                </label>

                <div className="col-sm-10">
                  <Field name="title" component="input" type="text" className="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div className="box-footer">
            <input
              type="submit"
              className={`btn btn-info pull-right ${
                scene.title === '' || submitting ? 'disabled' : ''
              }`}
              value="Save"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
);

const form: string = 'scene';

const selector = formValueSelector(form);

export default connect((state: IScene) => ({
  scene: {
    title: selector(state, 'title'),
    sections: selector(state, 'sections'),
  } as IScene,
}))(
  reduxForm<IScene, ISceneProps & ISceneStateProps>({
    form,
    enableReinitialize: true,
  })(SceneForm)
);
