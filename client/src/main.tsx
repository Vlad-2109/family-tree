import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { App } from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Provider>
  </StrictMode>,
);
