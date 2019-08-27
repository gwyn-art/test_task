import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { DrugForm } from '../Forms';
import { ADD_DRUG, EDIT_DRUG } from '../../actions';
import { Box } from '@material-ui/core';

export const DrugPopupTypes = {
  'EDIT': 'EDIT',
  'ADD': 'ADD'
};

const DrugPopupTitles = (type, step, name) => ({
  'ADD': `Create Drug ${step + 1}/2`,
  'EDIT': `Edit Drug ${name} ${step + 1}/2`
}[type]);

const DrugPopupActions = (
  step = 0,
  type = '', 
  isValid,
  handleClose = () => {}, 
  handleStepChange = () => {}, 
  handleConfirm = () => {}
) =>
  [
    <DialogActions key="first_step_actions">
      <Button onClick={handleClose}>
        Cancel
      </Button>
      <Button 
        variant="contained" 
        color="primary"
        onClick={() => handleStepChange(1)} 
      >
        Next
      </Button>
    </DialogActions>,
    <DialogActions key="second_step_actions">
      <Button onClick={handleClose}>
        Cancel
      </Button>
      <Button onClick={() => handleStepChange(-1)}>
        Prev
      </Button>
      <Button 
        variant="contained" 
        color="primary"
        disabled={!isValid}
        onClick={handleConfirm}
      >
        {type === DrugPopupTypes.ADD ? 'Create' : 'Edit'}
      </Button>
    </DialogActions>
  ][step];

const DrugPopupComponent = (props) => {
  const {
    open = false,
    handleClose = () => {},
    type = DrugPopupActions.ADD,
    initialValues = {},
    addDrug,
    editDrug
  } = props;

  const [step, setStep] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    if (error.length) {
      setTimeout(() => setError(''), 5000);
    }
  }, [error]);

  const handleSubmit = async () => {
    if (type === DrugPopupTypes.ADD) {
      addDrug(formValues)
        .then(() => handleClose())
        .catch(err => setError(err.message));
    } else {
      editDrug({...formValues, id: initialValues.id})
        .then(() => handleClose())
        .catch(err => setError(err.message));
    }
  };

  return (
    <Dialog 
      fullWidth
      open={open} 
      onClose={handleClose}
    >
      <DialogTitle>
        {DrugPopupTitles(type, step, initialValues.name)}
      </DialogTitle>
      <DialogContent>
        <DrugForm
          onChange={(isValid, values) => {
            setIsValid(isValid);
            setFormValues(values);
          }}
          formRef={formRef}
          onSubmit={handleSubmit}
          initialValues={type === DrugPopupTypes.ADD ? {} : initialValues}
          step={step}
        />
        <Box textAlign="center" color="error">
          {error}
        </Box>
      </DialogContent>
      {DrugPopupActions(
        step, 
        type,
        isValid,
        handleClose, 
        dif => setStep(step + dif),
        () => formRef.current && formRef.current.submitForm()
      )}
    </Dialog>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = dispatch => ({
  addDrug: async data => dispatch(ADD_DRUG(data)),
  editDrug: async data => dispatch(EDIT_DRUG(data))
});

export const DrugPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrugPopupComponent);