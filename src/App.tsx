import { BrowserRouter } from 'react-router-dom';

import { MainRoutes } from 'routes';

import { ToastProvider } from 'contexts/Toast';

import 'styles/main.css';

export function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </ToastProvider>
  );
}
