import * as React from 'react';
import { ISection, ISortData } from './SceneContainer';
import { SECTION_BUTTON, SECTION_LISTVIEW, SECTION_TEXT, SECTION_TEXTBOX } from '../../constants';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

interface ISectionsProps {
  sections: Array<ISection>;
  handleSectionSelect: (sectionIndex: number) => void;
  selectedSection: number;
  handleSortChange: (indexes: ISortData) => void;
  handleSectionRemove: (sectionIndex: number) => void;
}

const sectionStyle = (
  section: ISection,
  selectedSection: number,
  sectionIndex: number
): object => ({
  padding: '2px',
  border: `1px solid ${selectedSection === sectionIndex ? '#f39c12' : '#fff'}`,
  cursor: 'pointer',
  marginTop: `${section.marginTop}px`,
  marginBottom: `${section.marginBottom}px`,
});

const DragHandle = SortableHandle(() => (
  <span
    title="Move section"
    className="glyphicon glyphicon-sort"
    style={{
      cursor: 'move',
      fontSize: '20px',
      marginLeft: '-20px',
      marginTop: '8px',
    }}
  />
));

interface ISortableElementProps {
  section: ISection;
  handleSectionSelect: (index: number) => void;
  handleSectionRemove: (index: number) => void;
  selectedSection: number;
  index: number;
}

const SortableItem = SortableElement(
  ({
    section,
    handleSectionSelect,
    handleSectionRemove,
    selectedSection,
    index,
  }: ISortableElementProps) => (
    <div className="row">
      <div className="col-md-10">
        <div
          onClick={() => handleSectionSelect(index)}
          style={sectionStyle(section, selectedSection, index)}
        >
          <div>
            {section.type === SECTION_TEXT && (
              <div style={{ height: '35px', width: '100%' }}>
                <span
                  style={{
                    color: section.color,
                    fontSize: `${section.fontSize}px`,
                  }}
                >
                  {section.caption}
                </span>
              </div>
            )}

            {section.type === SECTION_TEXTBOX && (
              <div>
                <input type="text" disabled className="form-control" />
              </div>
            )}

            {section.type === SECTION_BUTTON && (
              <div>
                <button
                  className="btn btn-info btn-flat"
                  style={{
                    width: '100%',
                    fontWeight: 'bold',
                    backgroundColor: section.backgroundColor,
                    border: 0,
                  }}
                >
                  {section.caption}
                </button>
              </div>
            )}

            {section.type === SECTION_LISTVIEW && (
              <div>
                <span className="glyphicon glyphicon-list" style={{ fontSize: '20px' }} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-md-1">
        <DragHandle />
      </div>
      <div className="col-md-1">
        <span
          className="glyphicon glyphicon-remove"
          title="Remove section"
          style={{
            cursor: 'pointer',
            fontSize: '20px',
            marginLeft: '-20px',
            marginTop: '8px',
          }}
          onClick={() => handleSectionRemove(index)}
        />
      </div>
    </div>
  )
);

interface ISortableList {
  sections: Array<ISection>;
  handleSectionSelect: (index: number) => void;
  handleSectionRemove: (index: number) => void;
  selectedSection: number;
}

const SortableList = SortableContainer(
  ({ sections, handleSectionSelect, handleSectionRemove, selectedSection }: ISortableList) => (
    <div>
      {sections.map((section: ISection, i: number) => (
        <SortableItem
          key={`item-${i}`}
          index={i}
          section={section}
          handleSectionSelect={handleSectionSelect}
          handleSectionRemove={handleSectionRemove}
          selectedSection={selectedSection}
        />
      ))}
    </div>
  )
);

const Sections = ({
  sections,
  handleSectionSelect,
  selectedSection,
  handleSortChange,
  handleSectionRemove,
}: ISectionsProps) => (
  <div className="box box-solid">
    <div className="box-body">
      <SortableList
        useDragHandle={true}
        sections={sections}
        onSortEnd={handleSortChange}
        handleSectionSelect={handleSectionSelect}
        selectedSection={selectedSection}
        handleSectionRemove={handleSectionRemove}
      />
    </div>
  </div>
);

export default Sections;
