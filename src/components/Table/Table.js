import React from 'react';

import MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import MaterialTableRow from '@material-ui/core/TableRow';

import {TableRow} from './TableRow';


export const Table = (props) => {
  const {content = {}} = props;
  const {
    head = [], 
    body = [],
    types = [],
    actions = []
  } =  content;

  return (
    <MaterialTable>
      <TableHead>
        <MaterialTableRow>
          {head.map((text = '', index) => 
            <TableCell key={types[index]}>
              {text}
            </TableCell>  
          )}
          {
            actions.length ?
              <TableCell>
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