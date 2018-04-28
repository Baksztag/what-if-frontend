import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppProvider from './providers';
import {initializeFirebase} from './services';
import dotenv from 'dotenv';
dotenv.config();
initializeFirebase();

ReactDOM.render(<AppProvider />, document.getElementById('root'));
