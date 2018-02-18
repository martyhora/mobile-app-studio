import * as React from 'react';
import { ChangeEvent } from 'react';
import { ISection } from './SceneContainer';
import {
  SECTION_BUTTON,
  SECTION_IMAGE,
  SECTION_LISTVIEW,
  SECTION_TEXT,
  SECTION_TEXTBOX,
} from '../../constants';

interface ISectionType {
  id: string;
  name: string;
  icon: string;
}

const sectionTypes: Array<ISectionType> = [
  { id: SECTION_TEXT, name: 'Text', icon: 'glyphicon-font' },
  { id: SECTION_TEXTBOX, name: 'Textbox', icon: 'glyphicon-text-height' },
  { id: SECTION_BUTTON, name: 'Button', icon: 'glyphicon-ok-sign' },
  { id: SECTION_LISTVIEW, name: 'List view', icon: 'glyphicon-list' },
  { id: SECTION_IMAGE, name: 'Image', icon: 'glyphicon-picture' },
];

interface ISectionsListProps {
  sections: Array<ISection>;
  sectionTitle: string;
  addSection: (sectionType: string) => void;
  saveScene: () => void;
  handleSectionTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SectionsList = ({
  sections,
  sectionTitle,
  addSection,
  saveScene,
  handleSectionTitleChange,
}: ISectionsListProps) => (
  <div className="row box box-solid">
    <div className="box-body">
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={sectionTitle}
          onChange={handleSectionTitleChange}
          placeholder="Section title"
          className="form-control"
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        {sectionTypes.map((sectionType, i) => (
          <button
            type="button"
            className={`btn btn-info warning btn-lg btn-block ${
              sectionTitle === '' ||
              sections.filter(section => section.title === sectionTitle).length > 0
                ? 'disabled'
                : ''
            }`}
            style={{ textAlign: 'left', marginBottom: '15px' }}
            onClick={() => {
              addSection(sectionType.id);
            }}
            key={i}
          >
            <div
              className={`glyphicon ${sectionType.icon}`}
              style={{ fontSize: '30px', float: 'left', marginRight: '15px' }}
              aria-hidden="true"
            />
            <div style={{ marginTop: '3px', float: 'left' }}>{sectionType.name}</div>
          </button>
        ))}
      </div>
      <div>
        <button className="btn btn-success btn-block" onClick={saveScene}>
          <span className="glyphicon glyphicon-floppy-save" /> Save scene
        </button>
      </div>
    </div>
  </div>
);

export default SectionsList;
