import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppProvider from './Provider';
import dotenv from 'dotenv';
dotenv.config();

ReactDOM.render(<AppProvider />, document.getElementById('root'));
