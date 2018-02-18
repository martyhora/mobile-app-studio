import * as React from 'react';
import { IApplication } from './ApplicationListContainer';
import { Link } from 'react-router-dom';
import ApplicationForm from './ApplicationForm';
import { IScene } from '../SceneList/SceneListContainer';
import ErrorList from '../ErrorList';

interface IApplicationProps {
  application: IApplication;
  applications: Array<IApplication>;
  handleApplicationRemove: (applicationIndex: number, applicationId: number) => void;
  handleApplicationEdit: (applicationId: number) => void;
  scenes: Array<IScene>;
  isLoading: boolean;
  apiErrors: Array<string>;
  formErrors: Array<string>;
  handleApplicationSave: (values: IApplication) => Promise<void>;
}

const ApplicationList = ({
  application,
  applications,
  handleApplicationRemove,
  handleApplicationEdit,
  scenes,
  isLoading,
  apiErrors,
  formErrors,
  handleApplicationSave,
}: IApplicationProps) => (
  <div>
    <div style={{ marginBottom: '20px' }}>
      <button
        className="btn btn-info"
        style={{ float: 'left' }}
        data-toggle="modal"
        data-target="#applicationModal"
      >
        Add application
      </button>

      <br style={{ clear: 'both' }} />
    </div>
    <div className="box box-solid">
      <div className="box-body">
        <ErrorList header="Server error" errors={apiErrors} />

        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>API base</th>
              <th style={{ width: '6%' }}>Actions</th>
            </tr>
          </thead>
          {!isLoading && (
            <tbody>
              {applications.map((application: IApplication, i: number) => (
                <tr key={i}>
                  <td>
                    <Link to={`/scene-list/${application.id}`} key={i}>
                      {application.title}
                    </Link>
                  </td>
                  <td>{application.apiBase}</td>
                  <td>
                    <span
                      className="glyphicon glyphicon-remove"
                      title="Remove application"
                      style={{ cursor: 'pointer', fontSize: '20px' }}
                      onClick={() => handleApplicationRemove(i, application.id)}
                    />
                    <span
                      className="glyphicon glyphicon-edit"
                      title="Edit application"
                      style={{
                        cursor: 'pointer',
                        fontSize: '20px',
                        marginLeft: '7px',
                      }}
                      onClick={() => handleApplicationEdit(application.id)}
                      data-toggle="modal"
                      data-target="#applicationModal"
                    />
                    <a href={`/api/v1/applications/create/${application.id}`}>
                      <span
                        className="glyphicon glyphicon-download-alt"
                        title="Create application"
                        style={{
                          cursor: 'pointer',
                          fontSize: '20px',
                          marginLeft: '7px',
                        }}
                      />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          )}

          {isLoading && (
            <tbody className="text-center">
              <tr>
                <td colSpan={3}>
                  <span
                    className="glyphicon glyphicon-spin glyphicon-refresh text-primary"
                    style={{ fontSize: '20px' }}
                  />
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>

    <ApplicationForm
      scenes={scenes}
      formErrors={formErrors}
      handleApplicationSave={handleApplicationSave}
      initialValues={application}
    />
  </div>
);

export default ApplicationList;
