/* eslint-disable no-throw-literal */
import moment from 'moment';

import {drugsCollection} from '../firebase';
import { fillAction } from './helpers';

export const DRUGS_ACTIONS = {
  ...(fillAction('ADD_DRUG')),
  ...(fillAction('GET_DRUGS')),
  ...(fillAction('DELETE_DRUG')),
  ...(fillAction('EDIT_DRUG'))
}

export const ADD_DRUG = ({expirationDate, ...queryData}) => {
  return {
    type: DRUGS_ACTIONS.ADD_DRUG,
    payload: drugsCollection
      .add({
        ...queryData, 
        shelfLife: expirationDate.diff(moment(moment.now()), 'days')
      })
      .then(docRef => docRef.get())
      .then(doc => ({...doc.data(), id: doc.id, expirationDate}))
      .catch(() => {throw {error: true, message: 'Unable to add drug.'}})
  };
}

export const GET_DRUGS = () => {
  return {
    type: DRUGS_ACTIONS.GET_DRUGS,
    payload: drugsCollection
      .get()
      .then(querySnapshot =>
        querySnapshot
        .docs
        .map(doc => ({
          ...doc.data(),
          id: doc.id, 
          expirationDate: moment(moment.now()).add(doc.data().shelfLife + 1, 'days')
        }))
      )
      .catch(() => {throw {error: true, message: 'Unable to collect drugs.'}})
  };
}

export const DELETE_DRUG = id => {
  return {
    type: DRUGS_ACTIONS.DELETE_DRUG,
    payload: drugsCollection
      .doc(id)
      .delete()
      .then(() => ({id}))
      .catch(() => {throw {error: true, message: 'Unable to delete drug.'}})
  };
}

export const EDIT_DRUG = ({expirationDate, id, ...queryData}) => {
  return {
    type: DRUGS_ACTIONS.EDIT_DRUG,
    payload: drugsCollection
      .doc(id)
      .update({
        ...queryData, 
        shelfLife: expirationDate.diff(moment(moment.now()), 'days')
      })
      .then(doc => ({...queryData, id, expirationDate}))
      .catch(err => {throw {error: true, message: 'Unable to edit drug.'}})
  };
}

