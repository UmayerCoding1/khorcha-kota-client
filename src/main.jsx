import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from './layout/Root.jsx';
import { RouterProvider } from 'react-router-dom';
import render from './router/Route.jsx';

createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={render} >
    <Root />
    </RouterProvider>
  
)
