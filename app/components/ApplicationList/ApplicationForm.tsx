import * as React from 'react';
import { IApplication } from './ApplicationListContainer';
import MenuItems from './MenuItems';
import { IScene } from '../SceneList/SceneListContainer';
import { Field, FieldArray, formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import ErrorList from '../ErrorList';
import { connect } from 'react-redux';

interface IApplicationProps {
  formErrors: Array<string>;
  handleApplicationSave: (values: IApplication) => Promise<void>;
  scenes: Array<IScene>;
}

interface IApplicationStateProps {
  application: IApplication;
}

const ApplicationForm = ({
  scenes,
  initialValues,
  formErrors,
  handleSubmit,
  submitting,
  handleApplicationSave,
  application,
}: InjectedFormProps<IApplication> & IApplicationProps & IApplicationStateProps) => (
  <div id="applicationModal" className="modal fade" role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">
            &times;
          </button>
          <h4 className="modal-title">Application</h4>
        </div>
        <form
          className="form-horizontal"
          onSubmit={handleSubmit((values: IApplication) => {
            handleApplicationSave(values);
          })}
        >
          <div className="modal-body">
            <ErrorList errors={formErrors} />

            <div className="box-body">
              <div className="form-group">
                <label htmlFor="inputApplication" className="col-sm-2 control-label">
                  Title
                </label>

                <div className="col-sm-10">
                  <Field name="title" component="input" type="text" className="form-control" />
                </div>
              </div>
            </div>
            <div className="box-body">
              <div className="form-group">
                <label htmlFor="inputApplication2" className="col-sm-2 control-label">
                  API base
                </label>

                <div className="col-sm-10">
                  <Field name="apiBase" component="input" type="text" className="form-control" />
                </div>
              </div>
            </div>

            {application.id && (
              <div className="box-body">
                <div className="form-group">
                  <label htmlFor="inputApplication" className="col-sm-2 control-label">
                    Menu
                  </label>

                  <div className="col-sm-10">
                    <FieldArray name="menuItems" component={MenuItems} props={{ scenes }} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="box-footer">
            <input
              type="submit"
              className={`btn btn-info pull-right ${
                application.title === '' || application.apiBase === '' || submitting
                  ? 'disabled'
                  : ''
              }`}
              value="Save"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
);

const form: string = 'application';

const selector = formValueSelector(form);

export default connect((state: IApplication) => ({
  application: {
    id: selector(state, 'id'),
    title: selector(state, 'title'),
    apiBase: selector(state, 'apiBase'),
  } as IApplication,
}))(
  reduxForm<IApplication, IApplicationProps & IApplicationStateProps>({
    form,
    enableReinitialize: true,
  })(ApplicationForm)
);
