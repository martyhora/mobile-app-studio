import * as React from 'react';
import { ISection, ISortData } from './SceneContainer';
import { ChangeEvent } from 'react';
import Sections from './Sections';
import SectionsControl from './SectionsControl';
import { IScene } from '../SceneList/SceneListContainer';
import SectionsList from './SectionsList';
import SceneListPreview from './SceneListPreview';
import { ColorResult } from 'react-color';

interface ISceneProps {
  addSection: (sectionType: string) => void;
  sectionTitle: string;
  sections: Array<ISection>;
  selectedSection: number;
  scenes: Array<IScene>;
  handleSectionTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSectionParameterChange: (
    sectionIndex: number,
    parameter: string,
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  handleSectionSelect: (sectionIndex: number) => void;
  handleSectionRemove: (sectionIndex: number) => void;
  handleColorParameterChange: (sectionIndex: number, parameter: string, color: ColorResult) => void;
  handleSortChange: (indexes: ISortData) => void;
  saveScene: () => void;
}

const Scene = ({
  addSection,
  sectionTitle,
  sections,
  selectedSection,
  scenes,
  handleSectionTitleChange,
  handleSectionParameterChange,
  handleSectionSelect,
  handleSectionRemove,
  handleColorParameterChange,
  handleSortChange,
  saveScene,
}: ISceneProps) => (
  <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
    <section className="col-md-2">
      <SceneListPreview scenes={scenes} />
    </section>

    <section className="col-md-2">
      <SectionsList
        sections={sections}
        sectionTitle={sectionTitle}
        addSection={addSection}
        handleSectionTitleChange={handleSectionTitleChange}
        saveScene={saveScene}
      />
    </section>

    <section className="col-md-4">
      <Sections
        sections={sections}
        handleSectionSelect={handleSectionSelect}
        selectedSection={selectedSection}
        handleSortChange={handleSortChange}
        handleSectionRemove={handleSectionRemove}
      />
    </section>

    <section className="col-md-4">
      <SectionsControl
        section={sections[selectedSection]}
        sectionIndex={selectedSection}
        handleSectionParameterChange={handleSectionParameterChange}
        handleColorParameterChange={handleColorParameterChange}
        scenes={scenes}
      />
    </section>
  </div>
);

export default Scene;
