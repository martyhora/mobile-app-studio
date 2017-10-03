import * as React from 'react';
import Scene from './Scene';
import { ChangeEvent } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import SectionApi from '../../api/SectionApi';
import { IScene } from '../SceneList/SceneListContainer';
import SceneApi from '../../api/SceneApi';
import { SECTION_BUTTON, SECTION_LISTVIEW, SECTION_TEXT } from '../../constants';

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

interface ISceneContainer {
  sections: Array<ISection>;
  newSection: string;
  sectionTitle: string;
  selectedSection: number;
  scenes: Array<IScene>;
}

export interface ISortData {
  oldIndex: number;
  newIndex: number;
}

interface ISceneContainerProps {
  match: {
    params: {
      id?: number;
    };
  };
  history: any;
}

export default class SceneContainer extends React.Component<ISceneContainerProps, ISceneContainer> {
  constructor() {
    super();

    this.state = {
      sections: [],
      newSection: '',
      sectionTitle: '',
      selectedSection: null,
      scenes: [],
    };
  }

  handleNewSectionChange(e: ChangeEvent<HTMLSelectElement>): void {
    this.setState({ newSection: e.currentTarget.value });
  }

  handleSectionTitleChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({ sectionTitle: e.currentTarget.value });
  }

  addSection(): void {
    const { sectionTitle, newSection, sections } = this.state;

    if (
      sectionTitle === '' ||
      newSection === '' ||
      sections.filter(section => section.title === sectionTitle).length > 0
    ) {
      return;
    }

    let sections: Array<ISection> = sections;

    let section: ISection = {
      title: sectionTitle,
      type: newSection,
      marginTop: 0,
      marginBottom: 0,
      link: '',
    };

    switch (this.state.newSection) {
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

  handleColorParameterChange(sectionIndex: number, parameter: string, color: any): void {
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
    SectionApi.updateSection(this.state.sections, this.props.match.params.id, () => {});
  }

  componentDidMount() {
    SectionApi.fetchSections(this.props.match.params.id, (sections: Array<ISection>) => {
      this.setState({ sections });
    });

    SceneApi.fetchScenesForApplicationBySceneId(
      this.props.match.params.id,
      (scenes: Array<IScene>) => {
        this.setState({ scenes });
      }
    );
  }

  render() {
    return (
      <Scene
        sections={this.state.sections}
        newSection={this.state.newSection}
        sectionTitle={this.state.sectionTitle}
        selectedSection={this.state.selectedSection}
        handleNewSectionChange={this.handleNewSectionChange.bind(this)}
        handleSectionTitleChange={this.handleSectionTitleChange.bind(this)}
        addSection={this.addSection.bind(this)}
        handleSectionSelect={this.handleSectionSelect.bind(this)}
        handleSectionParameterChange={this.handleSectionParameterChange.bind(this)}
        handleSortChange={this.handleSortChange.bind(this)}
        handleSectionRemove={this.handleSectionRemove.bind(this)}
        handleColorParameterChange={this.handleColorParameterChange.bind(this)}
        saveScene={this.saveScene.bind(this)}
        scenes={this.state.scenes}
      />
    );
  }
}
