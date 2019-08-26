import React from 'react';

import { Formik, Field, Form } from 'formik';
import moment from 'moment';
import MomentUtils from '@date-io/moment';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { drugFormSchema } from './DrugFormSchema';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexFlow: 'column',
  },
  field: {
    marginTop: theme.spacing(2)
  },
  hideStep: {
    display: 'none'
  }
}));

export const DrugForm = (props) => {
  const {
    initialValues,
    step = 1,
    onValidationChange = () => {}
  } = props;
  
  const classes = useStyles();

  return (
    <Formik
      initialValues={initialValues || {
        code: '',
        name: '',
        expiration_date: moment(moment.now()).add(1, 'days')
      }}
      validationSchema={drugFormSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {({ errors, status, touched, setFieldValue, isValid }) => {
        onValidationChange(isValid);

        return (
          <Form>
            <Box className={step === 0 ? classes.form : classes.hideStep}>
              <Field
                type="text" 
                name="code"
                render={({field}) => 
                  <TextField
                    {...field}
                    className={classes.field}
                    label="Code"
                    error={errors.code && touched.code}
                    helperText={touched.code ? errors.code : ''}
                  />
                }
              />
              <Field
                type="text" 
                name="name"
                render={({field}) => 
                  <TextField
                    {...field}
                    className={classes.field}
                    label="Name"
                    error={errors.name && touched.name}
                    helperText={touched.name ? errors.name : ''}
                  />
                }
              />
              <Field
                type="text" 
                name="price"
                render={({field}) => 
                  <TextField
                    {...field}
                    className={classes.field}
                    label="Price"
                    onBlur={e => {
                      const value = e.target.value.replace(',', '.');
                      if (isNaN(parseFloat(value))) return field.onBlur(e);
        
                      setFieldValue('price', Number(value).toFixed(2), true);
                    }}
                    error={errors.price && touched.price}
                    helperText={touched.price ? errors.price : ''}
                  />
                }
              />
              <Field
                type="text" 
                name="expirationDate"
                render={({field}) =>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      {...field}
                      className={classes.field}
                      label="Expiration Date"
                      format="DD/MM/YYYY"
                      minDate={moment(moment.now()).add(1, 'days')}
                      maxDate={moment(moment.now()).add(1000, 'days')}
                      disablePast
                      onChange={e => setFieldValue('expirationDate', e)}
                      error={errors.expiration_date && touched.expirationDate}
                      helperText={touched.expirationDate ? 
                        errors.expirationDate 
                        : ''
                      }
                    />
                  </MuiPickersUtilsProvider>
                }
              />
            </Box>
            <Box className={step === 1 ? classes.form : classes.hideStep}>
              <Field
                type="text" 
                name="compositionAndFormOfRelease"
                render={({field}) => 
                  <TextField
                    {...field}
                    className={classes.field}
                    label="Composition And Form Of Release"
                    multiline
                    rows="4"
                  />
                }
              />
              <Field
                type="text" 
                name="indication"
                render={({field}) => 
                  <TextField
                    {...field}
                    className={classes.field}
                    label="Indication"
                    multiline
                    rows="4"
                  />
                }
              />
              <Field
                type="text" 
                name="сontraindications"
                render={({field}) => 
                  <TextField
                    {...field}
                    className={classes.field}
                    label="Contraindications"
                    multiline
                    rows="4"
                  />
                }
              />
            </Box>
          </Form>
        )}
      }
    </Formik>
  );
}