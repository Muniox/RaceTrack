import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  MapWrapper, 
  Sidebar,
} from './components';
import { AnimationProvider } from './context';
import './App.scss';


function App() {
  return (
    <AnimationProvider>
      <div className="app">
        <Sidebar />
        <MapWrapper />
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </AnimationProvider>
  );
}

export default App;