import * as React from 'react';
import { ISection } from './SceneContainer';
import { ChangeEvent } from 'react';
import { SECTION_BUTTON, SECTION_LISTVIEW, SECTION_TEXT } from '../../constants';
import { SketchPicker } from 'react-color';
import SelectBox from '../SelectBox';
import { IScene } from '../SceneList/SceneListContainer';

interface ISectionsControlProps {
  section: ISection;
  sectionIndex: number;
  handleSectionParameterChange: (
    sectionIndex: number,
    parameter: string,
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  handleColorParameterChange: (sectionIndex: number, parameter: string, color: any) => void;
  scenes: Array<IScene>;
}

const SectionsControl = ({
  section,
  sectionIndex,
  handleSectionParameterChange,
  handleColorParameterChange,
  scenes,
}: ISectionsControlProps) => (
  <div className="box-body">
    {section !== undefined && (
      <form className="form-horizontal">
        <div className="box-body">
          <div className="form-group">
            <label className="col-sm-2 control-label">Title</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={section.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSectionParameterChange(sectionIndex, 'title', e)}
              />
            </div>
          </div>

          {(section.type === SECTION_BUTTON || section.type === SECTION_TEXT) && (
            <div className="form-group">
              <label className="col-sm-2 control-label">Caption</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={section.caption}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleSectionParameterChange(sectionIndex, 'caption', e)}
                />
              </div>
            </div>
          )}

          {section.type === SECTION_TEXT && (
            <div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Link</label>
                <div className="col-sm-10">
                  <SelectBox
                    value={section.link}
                    prompt="- Select -"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      handleSectionParameterChange(sectionIndex, 'link', e)}
                    options={scenes.map((scene: IScene) => {
                      return { id: scene.title, name: scene.title };
                    })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-2 control-label">Font size</label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    value={section.fontSize}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleSectionParameterChange(sectionIndex, 'fontSize', e)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-2 control-label">Color</label>
                <div className="col-sm-10">
                  <SketchPicker
                    color={section.color}
                    onChange={(color: string) => {
                      handleColorParameterChange(sectionIndex, 'color', color);
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="col-sm-2 control-label">Margin top</label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                value={section.marginTop}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSectionParameterChange(sectionIndex, 'marginTop', e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Margin bottom</label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                value={section.marginBottom}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSectionParameterChange(sectionIndex, 'marginBottom', e)}
              />
            </div>
          </div>

          {section.type === SECTION_BUTTON && (
            <div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Backgroud color</label>
                <div className="col-sm-10">
                  <SketchPicker
                    color={section.backgroundColor}
                    onChange={(color: string) => {
                      handleColorParameterChange(sectionIndex, 'backgroundColor', color);
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-2 control-label">onClick source code</label>
                <div className="col-sm-10">
                  <textarea
                    style={{ height: '100px' }}
                    type="text"
                    className="form-control"
                    value={section.sourceCode}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleSectionParameterChange(sectionIndex, 'sourceCode', e)}
                  />
                </div>
              </div>
            </div>
          )}

          {section.type === SECTION_LISTVIEW && (
            <div className="form-group">
              <label className="col-sm-2 control-label">API URI</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={section.apiUri}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleSectionParameterChange(sectionIndex, 'apiUri', e)}
                />
              </div>
            </div>
          )}
        </div>
      </form>
    )}
    {section === undefined && <div>Select a section to configure it's parameters.</div>}
  </div>
);

export default SectionsControl;