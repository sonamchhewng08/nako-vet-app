import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import {AuthContextProvider} from './contextApi/authContext'
ReactDOM.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
,document.getElementById('root'));

