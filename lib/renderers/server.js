import React from 'react';
import ReactDomServer from 'react-dom/server';
import StateApi from 'state-api';
import axios from 'axios';
import config from 'config';
import App from 'components/App';

const serverRender = async () => {
  const response = await axios.get(`http://${config.host}:${config.port}/data`);
  const store = new StateApi(response.data);


  return {
    initialMarkup: ReactDomServer.renderToString(<App store={store}/>),
    initialData: response.data
  };
};

export default serverRender;
