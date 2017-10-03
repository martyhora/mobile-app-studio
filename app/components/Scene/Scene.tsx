import * as React from 'react';
import SelectBox, { ISelectBoxOption } from '../SelectBox';
import {
  SECTION_BUTTON,
  SECTION_LISTVIEW,
  SECTION_TEXT,
  SECTION_TEXTBOX,
  SECTION_IMAGE,
} from '../../constants';
import { ISection, ISortData } from './SceneContainer';
import { ChangeEvent } from 'react';
import Sections from './Sections';
import SectionsControl from './SectionsControl';
import { IScene } from '../SceneList/SceneListContainer';

const sectionTypes: Array<ISelectBoxOption> = [
  { id: SECTION_TEXT, name: 'Text' },
  { id: SECTION_TEXTBOX, name: 'Textbox' },
  { id: SECTION_BUTTON, name: 'Button' },
  { id: SECTION_LISTVIEW, name: 'List view' },
  { id: SECTION_IMAGE, name: 'Image' },
];

interface ISceneProps {
  addSection: () => void;
  newSection: string;
  sectionTitle: string;
  sections: Array<ISection>;
  selectedSection: number;
  scenes: Array<IScene>;
  handleSectionTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNewSectionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSectionParameterChange: (
    sectionIndex: number,
    parameter: string,
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  handleSectionSelect: (sectionIndex: number) => void;
  handleSectionRemove: (sectionIndex: number) => void;
  handleColorParameterChange: (sectionIndex: number, parameter: string, color: any) => void;
  handleSortChange: (indexes: ISortData) => void;
  saveScene: () => void;
}

const Scene = ({
  addSection,
  newSection,
  sectionTitle,
  sections,
  selectedSection,
  scenes,
  handleSectionTitleChange,
  handleNewSectionChange,
  handleSectionParameterChange,
  handleSectionSelect,
  handleSectionRemove,
  handleColorParameterChange,
  handleSortChange,
  saveScene,
}: ISceneProps) => (
  <div>
    <div style={{ marginBottom: '20px' }}>
      <div style={{ float: 'left', marginRight: '15px' }}>
        <input
          type="text"
          value={sectionTitle}
          onChange={handleSectionTitleChange}
          placeholder="Section title"
          className="form-control"
        />
      </div>
      <div style={{ float: 'left', marginRight: '15px' }}>
        <SelectBox
          value={newSection}
          prompt="- Select -"
          onChange={handleNewSectionChange}
          options={sectionTypes}
        />
      </div>
      <button
        className={`btn btn-info ${sectionTitle === '' ||
        newSection === '' ||
        sections.filter(section => section.title === sectionTitle).length > 0
          ? 'disabled'
          : ''}`}
        onClick={addSection}
        style={{ float: 'left', marginRight: '15px' }}
      >
        Add section
      </button>
      <button className="btn btn-success" onClick={saveScene} style={{ float: 'left' }}>
        Save scene
      </button>

      <br style={{ clear: 'both' }} />
    </div>
    <div className="row">
      <div className="col-md-4">
        <div className="box box-solid">
          <Sections
            sections={sections}
            handleSectionSelect={handleSectionSelect}
            selectedSection={selectedSection}
            handleSortChange={handleSortChange}
            handleSectionRemove={handleSectionRemove}
          />
        </div>
      </div>

      <div className="col-md-8">
        <div className="box box-solid">
          <SectionsControl
            section={sections[selectedSection]}
            sectionIndex={selectedSection}
            handleSectionParameterChange={handleSectionParameterChange}
            handleColorParameterChange={handleColorParameterChange}
            scenes={scenes}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Scene;
