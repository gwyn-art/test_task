# Test task for Jooble
### Created with CRA:
```
yarn install
yarn run start
```
## Structure

#### /src/components/Table
Wrapper on Material Table and TableRow mostly to extract code and add actions column.
#### /src/components/Pages/Drug
Extracting code from App.js and adopting to possible routing structure.
#### /src/components/Popups/DrugPopup
Popup wrapper on DrugForm. Keeping control of steps change and form submitting.
#### /src/components/Forms/DrugForm
DrugForm split in 2 steps.
#### /firebase
Helper for firebase connection.
#### /actions and /reducers
Simply actions and reducers for Drug domain :)

## Used:
* `react redux firebase` as required
* `material-ui` components as components library
* `redux-promise-middleware` as middleware for working with firebase (I used it for first time and it seems pretty handy)
* `formik yup` for form validations
* `moment` for date picker and works with date
* 
## Time spent:
* ~5 hours for dev and thinking of architecture
* ~1.5 hour for docs (firebase, material ui and promise middleware)
* Some small amount of time to write this note :)