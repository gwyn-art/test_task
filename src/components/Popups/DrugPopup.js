import React, {useState} from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { DrugForm } from '../Forms';

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
      >
        {type === DrugPopupTypes.ADD ? 'Create' : 'Edit'}
      </Button>
    </DialogActions>
  ][step];

export const DrugPopup = (props) => {
  const {
    open = false,
    handleClose = () => {},
    handleConfirm = () => {},
    type = DrugPopupActions.ADD,
    editData = {}
  } = props;

  const [step, setStep] = useState(0);
  const [isValid, setIsValid] = useState(false);

  return (
    <Dialog 
      fullWidth
      open={open} 
      onClose={handleClose}
    >
      <DialogTitle>
        {DrugPopupTitles(type, step, editData.name)}
      </DialogTitle>
      <DialogContent>
        <DrugForm
          onValidationChange={isValid => setIsValid(isValid)}
          step={step}
        />
      </DialogContent>
      {DrugPopupActions(
        step, 
        type,
        isValid,
        handleClose, 
        dif => setStep(step + dif),
        handleConfirm
      )}
    </Dialog>
  );
}