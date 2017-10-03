import * as React from 'react'
import ApplicationList from './ApplicationList'
import {ChangeEvent} from "react";
import ApplicationApi from "../../api/ApplicationApi";
import {IMenuItem} from "./MenuItems";
import {IScene} from "../SceneList/SceneListContainer";
import SceneApi from "../../api/SceneApi";

export interface IApplication {
    id?: number;
    title: string;
    apiBase: string;
    menuItems: Array<IMenuItem>;
}

interface IApplicationListContainer {
    applications: Array<IApplication>;
    application: IApplication;
    scenes: Array<IScene>;
}

const defaultApplication = {
    id: null,
    title: '',
    apiBase: '',
    menuItems: [],
};

export default class ApplicationListContainer extends React.Component<{}, IApplicationListContainer> {
    constructor() {
        super();

        this.state = {
            applications: [],
            application: defaultApplication,
            scenes: [],
        }
    }

    addApplication(): void {
        this.setState({ isFormVisible: true });
    }

    handleApplicationRemove(applicationIndex: number, applicationId: number): void {
        ApplicationApi.deleteApplication(applicationId, () => {
            let applications: Array<IApplication> = this.state.applications;

            applications.splice(applicationIndex, 1);

            this.setState({ applications });
        });
    }

    handleApplicationEdit(applicationId: number): void {
        ApplicationApi.fetchApplicationById(applicationId, ((application: IApplication) => {
            SceneApi.fetchScenesByApplicationId(applicationId, (scenes: Array<IScene>) => {
                this.setState({ application, scenes: scenes });
            });
        }));
    }

    handleApplicationSave(): void {
        const { title, apiBase, id } = this.state.application;

        if (title === '' || apiBase === '') {
            return;
        }

        if (!id) {
            ApplicationApi.addApplication(this.state.application, () => {
                let applications: Array<IApplication> = this.state.applications;

                let application: IApplication = this.state.application;

                applications.push(application);

                this.setState({ applications, application: defaultApplication });
            });
        } else {
            ApplicationApi.updateApplication(id, this.state.application, () => {
                this.setState({ application: defaultApplication });

                this.fetchApplications();
            });
        }

        $('#applicationModal').modal('toggle');
    }

    handleParameterChange(parameter: string, e: ChangeEvent<HTMLInputElement>): void {
        let application: IApplication = this.state.application;

        application[parameter] = e.currentTarget.value;

        this.setState({ application });
    }

    handleMenuItemChange(parameter: string, menuItemIndex: number, e: ChangeEvent<HTMLInputElement>): void {
        let application: IApplication = this.state.application;

        application.menuItems[menuItemIndex][parameter] = e.currentTarget.value;

        this.setState({ application });
    }

    fetchApplications(): void {
        ApplicationApi.fetchApplications((applications: Array<IApplication>) => {
            this.setState({ applications });
        });
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
        return <ApplicationList
                    applications={this.state.applications}
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
    }
}