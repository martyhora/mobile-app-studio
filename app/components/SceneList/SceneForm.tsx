import * as React from 'react'
import {ChangeEvent} from "react";
import {IScene} from "../SceneList/SceneListContainer";

interface ISceneProps {
    scene: IScene;
    handleParameterChange: (parameter: string, e: ChangeEvent<HTMLInputElement>) => void;
    handleSceneSave: () => void;
}

const SceneForm = ({ scene, handleParameterChange, handleSceneSave }: ISceneProps) =>
    <div id="sceneModal" className="modal fade" role="dialog">
        <div className="modal-dialog">

            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Scene</h4>
                </div>
                <div className="modal-body">

                    <form className="form-horizontal">
                        <div className="box-body">
                            <div className="form-group">
                                <label htmlFor="inputScene" className="col-sm-2 control-label">Title</label>

                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputScene" placeholder="Title" value={scene.title} onChange={(e) => handleParameterChange('title', e)} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="box-footer">
                    <button type="submit" className={`btn btn-info pull-right ${scene.title === '' ? 'disabled' : ''}`} onClick={handleSceneSave}>Save</button>
                </div>
            </div>
        </div>
    </div>

export default SceneForm