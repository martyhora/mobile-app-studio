import * as React from 'react';
import { IScene } from '../SceneList/SceneListContainer';
import { Field } from 'redux-form';
import { WrappedFieldArrayProps } from 'redux-form/lib/FieldArray';

export interface IMenuItem {
  [key: string]: string;
  title: string;
  sceneTitle: string;
}

interface IMenuItemsProps {
  scenes: Array<IScene>;
}

const MenuItems = ({ scenes, fields }: IMenuItemsProps & WrappedFieldArrayProps<IMenuItem>) => (
  <table className="table">
    <tbody>
      {fields.map((menuItem, i: number) => (
        <tr key={i}>
          <td>
            <Field
              name={`${menuItem}.title`}
              component="input"
              type="text"
              className="form-control"
            />
          </td>
          <td>
            <Field name={`${menuItem}.sceneTitle`} component="select" className="form-control">
              <option value="">- Select- </option>
              {scenes.map(scene => (
                <option key={`menuItem-scene-${scene.id}`} value={scene.title}>
                  {scene.title}
                </option>
              ))}
            </Field>
          </td>
          <td>
            <span
              className="glyphicon glyphicon-remove"
              title="Remove item"
              style={{ cursor: 'pointer', fontSize: '20px' }}
              onClick={() => fields.remove(i)}
            />
          </td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan={2}>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => {
              fields.push({ title: '', sceneTitle: '' });
            }}
          >
            Add item
          </button>
        </td>
      </tr>
    </tfoot>
  </table>
);

export default MenuItems;
