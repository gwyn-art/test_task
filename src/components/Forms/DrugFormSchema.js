import * as yup from 'yup';
import moment from 'moment';

export const drugFormSchema = yup.object().shape({
  code: yup
    .string()
    .min(5, 'Code length must be greater than 4.')
    .max(10, 'Code length must be less than 10.')
    .required('Code is required.'),
  name: yup
    .string()
    .min(5, 'Name length must be greater than 5.')
    .max(100, 'Name length must be less than 100.')
    .required('Name is required.'),
  price: yup
    .number()
    .typeError('Price must be a number.')
    .min(0.01, 'Price must be greater than 0.')
    .required('Price is required.'),
  expirationDate:  yup
    .date()
    .min(moment(moment.now()).add(1, 'days'), 'Must be at list one day long.')
    .max(moment(moment.now()).add(1000, 'days'), 'Can not be longer than 1000 days.')
    .required('Expiration date is required.'),
  compositionAndFormOfRelease: yup
    .string()
    .max(2000, 'Composition And Form Of Release length must be less than 2000.'),
  indication: yup
    .string()
    .max(2000, 'Indication length must be less than 2000.'),
  contraindications: yup
    .string()
    .max(2000, 'Field length must be less than 2000.'),
});