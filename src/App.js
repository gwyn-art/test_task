import React, {useState} from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import {Table, TableRowActions} from './components/Table';
import { DrugPopup, DrugPopupTypes } from './components/Popups';
import {db} from './firebase';

const body = [
  {
    id: '1231231',
    code: '123xcas',
    name: 'analgin',
    price: '12.11'
  },
  {
    id: '52432131',
    code: '123code',
    name: 'spasmalgon',
    price: '15.00'
  }
];

const head = ['Code', 'Name', 'Price ($)'];
const types = ['code', 'name', 'price'];

db.collection("medicines_ruslan").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
});

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));


const App = () => {
  const classes = useStyles();
  
  const [popupType, setPopupType] = useState(DrugPopupTypes.ADD);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editedDrugData, setEditedDragData] = useState({});

  return (
    <div className="App">
      <Table
        content={{
          body,
          head,
          types,
          actions: [
            {
              type: TableRowActions.EDITABLE,
              handle: id => {
                setEditedDragData(body.filter(drug => drug.id === id)[0]);
                setPopupType(DrugPopupTypes.EDIT);
                setPopupOpen(true);
              }
            },
            {
              type: TableRowActions.REMOVABLE,
              handle: id => console.log(`Deleted ${id}`)
            }
          ]
        }}
      />
      <Fab 
        className={classes.fab} 
        aria-label='Create' 
        color='primary'
        onClick={() => { 
          setPopupType(DrugPopupTypes.ADD);
          setPopupOpen(true);
        }}
      >
        <AddIcon/>
      </Fab>
      <DrugPopup
        open={popupOpen}
        type={popupType}
        handleClose={() => setPopupOpen(false)}
        handleConfirm={() => console.log('Drug Created')}
        editData={editedDrugData}
      />
    </div>
  );
}

export default App;
