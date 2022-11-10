import './App.css';
import './css/Station.css'
import Selectstation from './components/Selectstaion'
import Selectroute from './components/Selectroutes'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"

function App() {
  return (
    <Router basename="/NammaMetro">

      <Routes>
        <Route exact path='/' element={<Selectroute />}></Route>
        <Route path="/selectstation" element={<Selectstation />}></Route>
      </Routes>

    </Router>

  );
}

export default App;
