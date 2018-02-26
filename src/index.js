import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter} from 'react-router-dom'
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

require('dotenv').config()

const socket = io.connect(`http://localhost:3080`);

ReactDOM.render(
    <SocketProvider socket={ socket }>
        <HashRouter>
            <App />
        </HashRouter>
    </SocketProvider>,    
 document.getElementById('root'));