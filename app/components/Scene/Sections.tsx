import * as React from 'react';
import { ISection, ISortData } from './SceneContainer';
import { SECTION_BUTTON, SECTION_LISTVIEW, SECTION_TEXT, SECTION_TEXTBOX } from '../../constants';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { ChangeEvent } from 'react';

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
    style={{ cursor: 'move', fontSize: '20px', marginLeft: '-20px', marginTop: '8px' }}
  />
));

const SortableItem = SortableElement(
  ({ value, handleSectionSelect, handleSectionRemove, selectedSection, i }) => (
    <div className="row">
      <div className="col-md-10">
        <div
          onClick={(e: ChangeEvent<HTMLInputElement>) => handleSectionSelect(i)}
          style={sectionStyle(value, selectedSection, i)}
        >
          <div>
            {value.type === SECTION_TEXT && (
              <div style={{ height: '35px', width: '100%' }}>
                <span style={{ color: value.color, fontSize: `${value.fontSize}px` }}>
                  {value.caption}
                </span>
              </div>
            )}

            {value.type === SECTION_TEXTBOX && (
              <div>
                <input type="text" disabled className="form-control" />
              </div>
            )}

            {value.type === SECTION_BUTTON && (
              <div>
                <button
                  className="btn btn-info btn-flat"
                  style={{
                    width: '100%',
                    fontWeight: 'bold',
                    backgroundColor: value.backgroundColor,
                    border: 0,
                  }}
                >
                  {value.caption}
                </button>
              </div>
            )}

            {value.type === SECTION_LISTVIEW && (
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
          style={{ cursor: 'pointer', fontSize: '20px', marginLeft: '-20px', marginTop: '8px' }}
          onClick={() => handleSectionRemove(i)}
        />
      </div>
    </div>
  )
);

const SortableList = SortableContainer(
  ({ items, handleSectionSelect, handleSectionRemove, selectedSection }) => (
    <div>
      {items.map((value, i: number) => (
        <SortableItem
          key={`item-${i}`}
          i={i}
          index={i}
          value={value}
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
  <div className="box-body">
    <SortableList
      useDragHandle={true}
      items={sections}
      onSortEnd={handleSortChange}
      handleSectionSelect={handleSectionSelect}
      selectedSection={selectedSection}
      handleSectionRemove={handleSectionRemove}
    />
  </div>
);

export default Sections;
