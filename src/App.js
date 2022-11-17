import './App.css';
import './css/Station.css'
import Selectstation from './components/Selectstaion'
import Selectroute from './components/Selectroutes'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import { useState } from 'react';

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("")
  const [tostationcode, setTostationcode] = useState("");
  const [fromstationcode, setFromstationcode] = useState("");
  const [changestation, setChangestation] = useState("")

  function stationinfo(data) {
    setFrom(data.from);
    setTo(data.to);
    setTostationcode(data.tostationcode);
    setFromstationcode(data.fromstationcode);
  }

  function Changestation(chnagedata) {
    setChangestation(chnagedata)
  }



  return (
    <Router basename="/NammaMetro">

      <Routes>
        <Route exact path='/' element={<Selectroute from={from} to={to} tostationcode={tostationcode} fromstationcode={fromstationcode} Changestation={Changestation} />}></Route>
        <Route path="/selectstation" element={<Selectstation stationinfo={stationinfo} changestation={changestation} />}></Route>
      </Routes>

    </Router>

  );
}

export default App;
