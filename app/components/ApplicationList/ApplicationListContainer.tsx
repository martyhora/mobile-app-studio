import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
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

  handleApplicationRemove(applicationIndex: number, applicationId: number): void {
    ApplicationApi.deleteApplication(
      applicationId,
      () => {
        let applications: Array<IApplication> = this.state.applications;

        applications.splice(applicationIndex, 1);

        this.setState({ applications });
      },
      this.props.authToken
    );
  }

  async handleApplicationEdit(applicationId: number) {
    const application = await ApplicationApi.fetchApplicationById(
      applicationId,
      this.props.authToken
    );

    const scenes = await SceneApi.fetchScenesByApplicationId(applicationId, this.props.authToken);

    this.setState({ application, scenes });
  }

  async handleApplicationSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { title, apiBase, id } = this.state.application;

    if (title === '' || apiBase === '') {
      return;
    }

    let responseData: ApiSaveResponse = null;

    if (!id) {
      responseData = await ApplicationApi.addApplication(
        this.state.application,
        this.props.authToken
      );
    } else {
      responseData = await ApplicationApi.updateApplication(
        id,
        this.state.application,
        this.props.authToken
      );
    }

    if (responseData.success === false) {
      this.setState({ formErrors: responseData.errors });

      return;
    }

    this.setState({ application: defaultApplication });

    this.fetchApplications();

    $('#applicationModal').modal('toggle');
  }

  handleParameterChange(parameter: string, e: ChangeEvent<HTMLInputElement>): void {
    let application: IApplication = this.state.application;

    application[parameter] = e.currentTarget.value;

    this.setState({ application });
  }

  handleMenuItemChange(
    parameter: string,
    menuItemIndex: number,
    e: ChangeEvent<HTMLInputElement>
  ): void {
    let application: IApplication = this.state.application;

    application.menuItems[menuItemIndex][parameter] = e.currentTarget.value;

    this.setState({ application });
  }

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

  handleMenuItemAdd(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const application = this.state.application;

    this.setState({
      application: {
        ...application,
        menuItems: [
          ...application.menuItems,
          {
            title: '',
            sceneTitle: '',
          },
        ],
      },
    });
  }

  handleMenuItemRemove(menuItemIndex: number): void {
    let application: IApplication = this.state.application;

    application.menuItems.splice(menuItemIndex, 1);

    this.setState({ application });
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
        handleApplicationRemove={this.handleApplicationRemove.bind(this)}
        handleApplicationSave={this.handleApplicationSave.bind(this)}
        handleParameterChange={this.handleParameterChange.bind(this)}
        handleApplicationEdit={this.handleApplicationEdit.bind(this)}
        handleMenuItemChange={this.handleMenuItemChange.bind(this)}
        handleMenuItemAdd={this.handleMenuItemAdd.bind(this)}
        handleMenuItemRemove={this.handleMenuItemRemove.bind(this)}
        scenes={this.state.scenes}
      />
    );
  }
}

export default connect((state: AppState) => ({
  authToken: state.auth.authToken,
}))(ApplicationListContainer);
