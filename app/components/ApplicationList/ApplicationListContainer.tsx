import * as React from 'react';
import ApplicationList from './ApplicationList';
import ApplicationApi from '../../api/ApplicationApi';
import { IMenuItem } from './MenuItems';
import { IScene } from '../SceneList/SceneListContainer';
import SceneApi from '../../api/SceneApi';
import { connect } from 'react-redux';
import { ApiSaveResponse } from '../../api/BaseApi';
import { AppState } from '../../reducers';

export interface IApplication {
  [key: string]: any;
  id?: number;
  title: string;
  apiBase: string;
  menuItems: Array<IMenuItem>;
}

interface IApplicationListContainerState {
  isLoading: boolean;
  apiErrors: Array<string>;
  formErrors: Array<string>;
  applications: Array<IApplication>;
  application: IApplication;
  scenes: Array<IScene>;
}

interface IApplicationListContainerProps {
  authToken: string;
}

const defaultApplication: IApplication = {
  id: null,
  title: '',
  apiBase: '',
  menuItems: [],
};

class ApplicationListContainer extends React.Component<
  IApplicationListContainerProps,
  IApplicationListContainerState
> {
  state: IApplicationListContainerState = {
    applications: [],
    application: defaultApplication,
    scenes: [],
    isLoading: false,
    apiErrors: [],
    formErrors: [],
  };

  handleApplicationRemove = (applicationIndex: number, applicationId: number): void => {
    ApplicationApi.deleteApplication(
      applicationId,
      () => {
        let applications: Array<IApplication> = this.state.applications;

        applications.splice(applicationIndex, 1);

        this.setState({ applications });
      },
      this.props.authToken
    );
  };

  handleApplicationEdit = async (applicationId: number): Promise<void> => {
    const application = await ApplicationApi.fetchApplicationById(
      applicationId,
      this.props.authToken
    );

    const scenes = await SceneApi.fetchScenesByApplicationId(applicationId, this.props.authToken);

    this.setState({ application, scenes });
  };

  handleApplicationSave = async (values: IApplication): Promise<void> => {
    const { title, apiBase, id } = values;

    if (title === '' || apiBase === '') {
      return;
    }

    let responseData: ApiSaveResponse = null;

    if (!id) {
      responseData = await ApplicationApi.addApplication(values, this.props.authToken);
    } else {
      responseData = await ApplicationApi.updateApplication(id, values, this.props.authToken);
    }

    if (responseData.success === false) {
      this.setState({ formErrors: responseData.errors });

      return;
    }

    this.setState({ application: defaultApplication });

    this.fetchApplications();

    $('#applicationModal').modal('toggle');
  };

  fetchApplications(): void {
    try {
      this.setState({ isLoading: true }, async () => {
        const applications = await ApplicationApi.fetchApplications(this.props.authToken);

        this.setState({ applications, isLoading: false });
      });
    } catch (error) {
      this.setState({
        apiErrors: ['An error while fetching data occured, please try again later'],
      });
    }
  }

  componentDidMount() {
    this.fetchApplications();
  }

  render() {
    return (
      <ApplicationList
        applications={this.state.applications}
        isLoading={this.state.isLoading}
        apiErrors={this.state.apiErrors}
        formErrors={this.state.formErrors}
        application={this.state.application}
        handleApplicationRemove={this.handleApplicationRemove}
        handleApplicationEdit={this.handleApplicationEdit}
        scenes={this.state.scenes}
        handleApplicationSave={this.handleApplicationSave}
      />
    );
  }
}

export default connect((state: AppState) => ({
  authToken: state.auth.authToken,
}))(ApplicationListContainer);
