
import './App.css';
import ChartsPage from './pages/ChartsPage';
import HomePage from './pages/HomePage';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import { MyContext } from './context/TracksData'
import { useState } from 'react';

function App() {
  const [data,setData]=useState<{value:number,time:string}[]>([])

  return (
    <MyContext.Provider value= {{tracks: data, setTracks:setData }}>

    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/charts/*" element={<ChartsPage></ChartsPage>} />
      </Routes>
    </BrowserRouter>
    </div>
    </MyContext.Provider>

   
  );
}

export default App;
