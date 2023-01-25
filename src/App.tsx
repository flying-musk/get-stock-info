import React from 'react';
import { getAPI } from './API';

function App() {
  const [data, setData] = React.useState({});

  const getData = () =>
    getAPI().then((res) => {
      if (res.status === 200) {
        console.log('ohlala', res.data);
        setData(res.data);
      } else {
        console.log(res);
      }
    });

  React.useEffect(() => {
    getData();
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}

export default App;
