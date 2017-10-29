import * as React from 'react';
import Scene from './Scene';
import { ChangeEvent } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import SectionApi from '../../api/SectionApi';
import { IScene } from '../SceneList/SceneListContainer';
import SceneApi from '../../api/SceneApi';
import { SECTION_BUTTON, SECTION_LISTVIEW, SECTION_TEXT } from '../../constants';
import { connect } from 'react-redux';
import { ColorResult } from 'react-color';

export interface ISection {
  title: string;
  type: string;
  marginTop: number;
  marginBottom: number;
  caption?: string;
  sourceCode?: string;
  backgroundColor?: string;
  apiUri?: string;
  link?: string;
  color?: string;
  fontSize?: number;
}

interface ISceneContainerState {
  sections: Array<ISection>;
  sectionTitle: string;
  selectedSection: number;
  scenes: Array<IScene>;
}

export interface ISortData {
  oldIndex: number;
  newIndex: number;
}

interface ISceneContainerProps {
  authToken: string;
  match: {
    params: {
      id?: number;
    };
  };
  history: any;
}

class SceneContainer extends React.Component<ISceneContainerProps, ISceneContainerState> {
  constructor() {
    super();

    this.state = {
      sections: [],
      sectionTitle: '',
      selectedSection: null,
      scenes: [],
    };
  }

  handleSectionTitleChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({ sectionTitle: e.currentTarget.value });
  }

  addSection(type: string): void {
    let { sectionTitle, sections } = this.state;

    if (
      sectionTitle === '' ||
      sections.filter(section => section.title === sectionTitle).length > 0
    ) {
      return;
    }

    let section: ISection = {
      type,
      title: sectionTitle,
      marginTop: 0,
      marginBottom: 0,
      link: '',
    };

    switch (type) {
      case SECTION_BUTTON:
        section.caption = 'BUTTON';
        section.backgroundColor = '#00c0ef';
        break;

      case SECTION_TEXT:
        section.caption = '';
        break;

      case SECTION_LISTVIEW:
        section.caption = '';
        break;
    }

    sections.push(section);

    this.setState({ sections, newSection: '', sectionTitle: '' });
  }

  handleSectionSelect(sectionIndex: number): void {
    this.setState({ selectedSection: sectionIndex });
  }

  handleSectionParameterChange(
    sectionIndex: number,
    parameter: string,
    e: ChangeEvent<HTMLInputElement>
  ): void {
    let sections: Array<ISection> = this.state.sections;

    sections[sectionIndex][parameter] = e.currentTarget.value;

    this.setState({ sections });
  }

  handleColorParameterChange(sectionIndex: number, parameter: string, color: ColorResult): void {
    let sections: Array<ISection> = this.state.sections;

    sections[sectionIndex][parameter] = color.hex;

    this.setState({ sections });
  }

  handleSortChange(indexes: ISortData): void {
    let sections: Array<ISection> = this.state.sections;

    sections = arrayMove(sections, indexes.oldIndex, indexes.newIndex);

    this.setState({ sections });
  }

  handleSectionRemove(sectionIndex: number): void {
    let sections: Array<ISection> = this.state.sections;

    sections.splice(sectionIndex, 1);

    this.setState({ sections });
  }

  saveScene() {
    SectionApi.updateSection(
      this.state.sections,
      this.props.match.params.id,
      () => {},
      this.props.authToken
    );
  }

  async fetchData(sceneId: number) {
    const sections = await SectionApi.fetchSections(sceneId, this.props.authToken);

    const scenes = await SceneApi.fetchScenesForApplicationBySceneId(sceneId, this.props.authToken);

    this.setState({ sections, scenes });
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps: ISceneContainerProps) {
    this.fetchData(nextProps.match.params.id);
  }

  render() {
    return (
      <Scene
        sections={this.state.sections}
        sectionTitle={this.state.sectionTitle}
        scenes={this.state.scenes}
        selectedSection={this.state.selectedSection}
        handleSectionTitleChange={this.handleSectionTitleChange.bind(this)}
        addSection={this.addSection.bind(this)}
        handleSectionSelect={this.handleSectionSelect.bind(this)}
        handleSectionParameterChange={this.handleSectionParameterChange.bind(this)}
        handleSortChange={this.handleSortChange.bind(this)}
        handleSectionRemove={this.handleSectionRemove.bind(this)}
        handleColorParameterChange={this.handleColorParameterChange.bind(this)}
        saveScene={this.saveScene.bind(this)}
      />
    );
  }
}

export default connect(state => ({
  authToken: state.auth.authToken,
}))(SceneContainer);
