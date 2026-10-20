import React from 'react';import {createRoot} from 'react-dom/client';import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx';import './styles/main.css';import './styles/immersive.css';import './styles/about.css';import './styles/redesign.css';import './styles/broadsheet.css';import './styles/responsive.css';import './styles/update3.css';
createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>);
