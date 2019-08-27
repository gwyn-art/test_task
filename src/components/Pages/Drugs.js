import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import {Table, TableRowActions} from '../Table';
import { DrugPopup, DrugPopupTypes } from '../Popups';
import {GET_DRUGS, DELETE_DRUG} from '../../actions';

const head = ['Code', 'Name', 'Price ($)'];
const types = ['code', 'name', 'price'];


const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));


const DrugsPageComponent = (props) => {
  const {
    drugList,
    getDrugs,
    deleteDrug
  } = props;

  const classes = useStyles();
  const [popupType, setPopupType] = useState(DrugPopupTypes.ADD);
  const [popupOpen, setPopupOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    getDrugs();
  }, [getDrugs]);

  return (
    <div className="App">
      <Table
        content={{
          body: drugList,
          head,
          types,
          actions: [
            {
              type: TableRowActions.EDITABLE,
              handle: id => {
                setInitialValues(drugList.filter(drug => drug.id === id)[0]);
                setPopupType(DrugPopupTypes.EDIT);
                setPopupOpen(true);
              }
            },
            {
              type: TableRowActions.REMOVABLE,
              handle: id => deleteDrug(id)
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
        initialValues={initialValues}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  drugList: state.drug.drugList
});

const mapDispatchToProps = dispatch => ({
  getDrugs: () => dispatch(GET_DRUGS()),
  deleteDrug: id => dispatch(DELETE_DRUG(id))
});

export const DrugsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrugsPageComponent);