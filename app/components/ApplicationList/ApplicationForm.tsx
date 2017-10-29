import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { IApplication } from './ApplicationListContainer';
import MenuItems from './MenuItems';
import { IScene } from '../SceneList/SceneListContainer';
import ErrorList from '../ErrorList';

interface IApplicationProps {
  application: IApplication;
  handleParameterChange: (parameter: string, e: ChangeEvent<HTMLInputElement>) => void;
  handleMenuItemChange: (
    parameter: string,
    menuItemIndex: number,
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  handleApplicationSave: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleMenuItemAdd: () => void;
  handleMenuItemRemove: (menuItemIndex: number) => void;
  scenes: Array<IScene>;
  formErrors: Array<string>;
}

const ApplicationForm = ({
  application,
  handleParameterChange,
  handleMenuItemChange,
  handleApplicationSave,
  handleMenuItemAdd,
  handleMenuItemRemove,
  scenes,
  formErrors,
}: IApplicationProps) => (
  <div id="applicationModal" className="modal fade" role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">
            &times;
          </button>
          <h4 className="modal-title">Application</h4>
        </div>
        <form className="form-horizontal" onSubmit={handleApplicationSave}>
          <div className="modal-body">
            <ErrorList errors={formErrors} />

            <div className="box-body">
              <div className="form-group">
                <label htmlFor="inputApplication" className="col-sm-2 control-label">
                  Title
                </label>

                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputApplication"
                    placeholder="Title"
                    value={application.title}
                    onChange={e => handleParameterChange('title', e)}
                  />
                </div>
              </div>
            </div>
            <div className="box-body">
              <div className="form-group">
                <label htmlFor="inputApplication2" className="col-sm-2 control-label">
                  API base
                </label>

                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputApplication2"
                    placeholder="API base"
                    value={application.apiBase}
                    onChange={e => handleParameterChange('apiBase', e)}
                  />
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
                    <MenuItems
                      menuItems={application.menuItems}
                      scenes={scenes}
                      handleMenuItemChange={handleMenuItemChange}
                      handleMenuItemAdd={handleMenuItemAdd}
                      handleMenuItemRemove={handleMenuItemRemove}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="box-footer">
            <input
              type="submit"
              className={`btn btn-info pull-right ${application.title === '' ||
              application.apiBase === ''
                ? 'disabled'
                : ''}`}
              value="Save"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default ApplicationForm;
