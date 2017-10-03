import * as React from 'react'
import {ISection} from "../Scene/SceneContainer";
import {SECTION_BUTTON, SECTION_LISTVIEW, SECTION_TEXT, SECTION_TEXTBOX} from "../../constants";


interface IScenePreviewProps {
    sections: Array<ISection>;
}

const ScenePreview = ({ sections }: IScenePreviewProps) =>
    <div className="box-body">
        {sections.map((section: ISection, i: number) =>
            <div key={i}>
                {section.type === SECTION_TEXT &&
                <div style={{ height: '35px', width: '100%' }}>
                    <span>{section.caption}</span>
                </div>}

                {section.type === SECTION_TEXTBOX &&
                <div>
                    <input type="text" disabled className="form-control" />
                </div>}

                {section.type === SECTION_BUTTON &&
                <div>
                    <button className="btn btn-info btn-flat" style={{ width: '100%', fontWeight: 'bold', backgroundColor: section.backgroundColor, border: 0 }}>{section.caption}</button>
                </div>}

                {section.type === SECTION_LISTVIEW &&
                <div>
                    <span className="glyphicon glyphicon-list" style={{ fontSize: '20px' }}></span>
                </div>}
            </div>
        )}
    </div>

export default ScenePreview