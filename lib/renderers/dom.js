import React from 'react';
import ReactDOM from 'react-dom';
import StateApi from 'state-api';
import App from '../components/App';

const initialData = window.initialData;
const store = new StateApi(initialData);
ReactDOM.render(<App store={store}/>, document.getElementById('root'));
