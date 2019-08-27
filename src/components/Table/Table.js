import React from 'react';

import MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import MaterialTableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core';

import {TableRow} from './TableRow';

const useStyles = makeStyles(theme => ({
  tableCell: {
    [theme.breakpoints.down('sm')]: {
      padding: '14px 22px 14px 12px',
    }
  }
}));

export const Table = (props) => {
  const {content = {}} = props;
  const {
    head = [], 
    body = [],
    types = [],
    actions = []
  } =  content;

  const classes = useStyles();

  return (
    <MaterialTable>
      <TableHead>
        <MaterialTableRow>
          {head.map((text = '', index) => 
            <TableCell 
              className={classes.tableCell} 
              key={types[index]}
            >
              {text}
            </TableCell>  
          )}
          {
            actions.length ?
              <TableCell
                className={classes.tableCell} 
              >
                Actions
              </TableCell>
            : null
          }
        </MaterialTableRow>
      </TableHead>
      <TableBody>
        {
          body.map(element => 
            <TableRow
              key={element.id}
              classes={classes}
              id={element.id}
              content={types.map(type => element[type] || '')}
              types={types}
              actions={actions}
            />  
          )
        }
      </TableBody>
    </MaterialTable>
  );
};