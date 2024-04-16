import './App.css';
import { Route,Routes } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import MapComp from './components/Map/Map';
import CreateUSer from './components/Form/CreatrUser';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Profile/>}></Route>
        <Route path="/CreateUSer" element={<CreateUSer/>}></Route>
        <Route path='/map' element={<MapComp/>}></Route>
        
      </Routes>
      
    </div>
  );
}

export default App;
