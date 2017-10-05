import * as React from 'react';
import { Link } from 'react-router-dom';
import { IScene } from '../SceneList/SceneListContainer';
import ScenePreview from '../SceneList/ScenePreview';

interface ISceneListPreviewProps {
  scenes: Array<IScene>;
}

const SceneListPreview = ({ scenes }: ISceneListPreviewProps) => (
  <div>
    {scenes.map((scene: IScene, i: number) => (
      <div style={{ textAlign: 'center', marginBottom: '15px' }} key={i}>
        <Link
          to={`/scene/${scene.id}`}
          key={i}
          className="col-md-3 box box-solid"
          style={{
            height: '300px',
            overflow: 'hidden',
          }}
        >
          <ScenePreview sections={scene.sections} />
        </Link>
        <div>{scene.title}</div>
      </div>
    ))}
  </div>
);

export default SceneListPreview;
