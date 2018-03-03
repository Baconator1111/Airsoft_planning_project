import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Router} from 'react-router-dom'
import history from './history'
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

const socket = io.connect(process.env.REACT_APP_SOCKET_CONNECTION);

ReactDOM.render(
    <SocketProvider socket={ socket }>
        <Router history={ history } >
            <App />
        </Router>
    </SocketProvider>,    
 document.getElementById('root'));