import {useState} from 'react';

export const useDoubleClick = (action = () => {}, time = 500) => {
  const [prevClickTime, setPrevClickTime] = useState(time + 1);

  return event => {
    if (Date.now() - prevClickTime < time) {
      action(event);
    }

    setPrevClickTime(Date.now());
  }
}