import * as React from 'react';
import { ChangeEvent } from 'react';
import { IScene } from '../SceneList/SceneListContainer';
import SelectBox from '../SelectBox';

export interface IMenuItem {
  title: string;
  sceneTitle: string;
}

interface IMenuItemsProps {
  menuItems: Array<IMenuItem>;
  scenes: Array<IScene>;
  handleMenuItemChange: (
    parameter: string,
    menuItemIndex: number,
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  handleMenuItemRemove: (menuItemIndex: number) => void;
  handleMenuItemAdd: () => void;
}

const MenuItems = ({
  menuItems,
  scenes,
  handleMenuItemChange,
  handleMenuItemRemove,
  handleMenuItemAdd,
}: IMenuItemsProps) => (
  <table className="table">
    <tbody>
      {menuItems.map((menuItem: IMenuItem, i: number) => (
        <tr key={i}>
          <td>
            <input
              type="text"
              value={menuItem.title}
              onChange={e => handleMenuItemChange('title', i, e)}
              className="form-control"
            />
          </td>
          <td>
            <SelectBox
              value={menuItem.sceneTitle}
              prompt="- Select -"
              onChange={e => handleMenuItemChange('sceneTitle', i, e)}
              options={scenes.map((scene: IScene) => {
                return { id: scene.title, name: scene.title };
              })}
            />
          </td>
          <td>
            <span
              className="glyphicon glyphicon-remove"
              title="Remove item"
              style={{ cursor: 'pointer', fontSize: '20px' }}
              onClick={() => handleMenuItemRemove(i)}
            />
          </td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan="2">
          <button className="btn btn-info" onClick={handleMenuItemAdd}>
            Add item
          </button>
        </td>
      </tr>
    </tfoot>
  </table>
);

export default MenuItems;
