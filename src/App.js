import React from 'react';

import {Table, TableRowActions} from './components/Table';
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

const App = () => {
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
              handle: id => console.log(`Edited ${id}`)
            },
            {
              type: TableRowActions.REMOVABLE,
              handle: id => console.log(`Deleted ${id}`)
            }
          ]
        }}
      />
    </div>
  );
}

export default App;
