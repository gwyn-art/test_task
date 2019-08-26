import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import MaterialTableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export const TableRowActions = {
  EDITABLE: 'EDITABLE',
  REMOVABLE: 'REMOVABLE'
};

const ActionsComponents = {
  EDITABLE: (handleClick = () => {}) => 
    <EditIcon key="edit" onClick={handleClick}/>,
  REMOVABLE: (handleClick = () => {}) => 
    <DeleteIcon key="delete" onClick={handleClick}/>,
};

export const TableRow = (props) => {
  const {
    id = '', 
    content = [], 
    types = [], 
    actions = []
  } = props;

  return (
    <MaterialTableRow>
      {
        content.map((element = '', index) => 
          <TableCell key={types[index]}>
            {element}
          </TableCell>
        )
      }
      <TableCell>
        {
          actions.map((action = {}) =>    
            ActionsComponents[action.type](
              () => action.handle(id)
            )      
          )
        }
      </TableCell>
    </MaterialTableRow>
  );
};


