import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import MaterialTableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';

export const TableRowActions = {
  EDITABLE: 'EDITABLE',
  REMOVABLE: 'REMOVABLE'
};

const ActionsComponents = {
  EDITABLE: (className, handleClick = () => {}) => 
    <EditIcon 
      key="edit" 
      className={className}
      color="primary"
      onClick={handleClick}
    />,
  REMOVABLE: (className, handleClick = () => {}) => 
    <DeleteIcon 
      key="delete"
      className={className}
      color="error" 
      onClick={handleClick}
    />,
};

const useStyles = makeStyles(theme => ({
  iconButton: {
    cursor: 'pointer',
    margin: '0 5px'
  }
}));

export const TableRow = (props) => {
  const {
    id = '', 
    content = [], 
    types = [], 
    actions = [],
    classes: parentClasses = {},
  } = props;

  const classes = useStyles();

  return (
    <MaterialTableRow
      className={parentClasses.tableRow || ''}
    >
      {
        content.map((element = '', index) => 
          <TableCell 
            key={types[index]}
            className={parentClasses.tableCell || ''}
          >
            {element}
          </TableCell>
        )
      }
      <TableCell
        className={parentClasses.tableCell || ''}
      >
        {
          actions.map((action = {}) =>    
            ActionsComponents[action.type](
              classes.iconButton,
              () => action.handle(id)
            )      
          )
        }
      </TableCell>
    </MaterialTableRow>
  );
};


