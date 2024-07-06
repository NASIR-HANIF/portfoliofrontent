import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux"
import store from './Store';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// ToastContainer ke options ko define kar rahe hain.
const toastOptions = {
  position: "bottom-center",  // React Toastify me directly string pass karte hain
  autoClose: 5000,            // milliseconds
  transition: Slide           // Transition ko directly component se import karke use karein
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
      <ToastContainer
        position={toastOptions.position}
        autoClose={toastOptions.autoClose}
        transition={toastOptions.transition}
      />

    </Provider>
  </React.StrictMode>
);


