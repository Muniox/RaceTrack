import {
  MapWrapper, 
  Sidebar
} from './components';
import './App.scss';


function App() {
  return (
    <div className="app">
      <Sidebar />
      <MapWrapper />
    </div>
  );
}

export default App;