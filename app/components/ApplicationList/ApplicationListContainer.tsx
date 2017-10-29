import * as React from 'react';
import ApplicationList from './ApplicationList';
import { ChangeEvent } from 'react';
import ApplicationApi from '../../api/ApplicationApi';
import { IMenuItem } from './MenuItems';
import { IScene } from '../SceneList/SceneListContainer';
import SceneApi from '../../api/SceneApi';
import { connect } from 'react-redux';

export interface IApplication {
  id?: number;
  title: string;
  apiBase: string;
  menuItems: Array<IMenuItem>;
}

interface IApplicationListContainerState {
  isLoading: boolean;
  apiErrors: Array<string>;
  applications: Array<IApplication>;
  application: IApplication;
  scenes: Array<IScene>;
}

interface IApplicationListContainerProps {
  authToken: string;
}

const defaultApplication = {
  id: null,
  title: '',
  apiBase: '',
  menuItems: [],
};

class ApplicationListContainer extends React.Component<
  IApplicationListContainerProps,
  IApplicationListContainerState
> {
  state = {
    applications: [],
    application: defaultApplication,
    scenes: [],
    isLoading: false,
    apiErrors: [],
  };

  addApplication(): void {
    this.setState({ isFormVisible: true });
  }

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

  handleApplicationSave(): void {
    const { title, apiBase, id } = this.state.application;

    if (title === '' || apiBase === '') {
      return;
    }

    if (!id) {
      ApplicationApi.addApplication(
        this.state.application,
        () => {
          let applications: Array<IApplication> = this.state.applications;

          let application: IApplication = this.state.application;

          applications.push(application);

          this.setState({ applications, application: defaultApplication });
        },
        this.props.authToken
      );
    } else {
      ApplicationApi.updateApplication(
        id,
        this.state.application,
        () => {
          this.setState({ application: defaultApplication });

          this.fetchApplications();
        },
        this.props.authToken
      );
    }

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
      this.setState({ errors: ['An error while fetching data occured, please try again later'] });
    }
  }

  handleMenuItemAdd(): void {
    let application: IApplication = this.state.application;

    application.menuItems.push({
      title: '',
      sceneTitle: '',
    });

    this.setState({ application });
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
        application={this.state.application}
        addApplication={this.addApplication.bind(this)}
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

export default connect(
  state => ({
    authToken: state.auth.authToken,
    // applications: state.applications.data,
    // isLoading: state.applications.isLoading,
    // apiErrors: state.applications.apiErrors,
  })
  // dispatch => ({
  //   fetchApplications: () => {
  //     dispatch(fetchApplications());
  //   },
  //   addApplication: (application: IApplication) => {
  //     dispatch(addApplication(application));
  //   },
  // })
)(ApplicationListContainer);
