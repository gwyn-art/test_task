import {DRUGS_ACTIONS} from '../actions';

const initialState = {
  drugList: [],
  error: false,
  errorType: '',
  errorMessage: ''
};

export const drug = (state = initialState, action = {}) => {

  switch(action.type) {
    case DRUGS_ACTIONS.GET_DRUGS_FULFILLED: {
      return {
        ...state,
        drugList: action.payload
      };
    }

    case DRUGS_ACTIONS.ADD_DRUG_FULFILLED: {
      return {
        ...state,
        drugList: [...state.drugList, action.payload] 
      };
    }

    case DRUGS_ACTIONS.DELETE_DRUG_FULFILLED: {
      return {
        ...state,
        drugList: state.drugList.filter(drug => drug.id !== action.payload.id)
      };
    }

    case DRUGS_ACTIONS.EDIT_DRUG_FULFILLED: {
      return {
        ...state,
        drugList: state
          .drugList
          .map(drug => drug.id === action.payload.id ? action.payload : drug)
      };
    }

    default: 
      return state;
  }
}