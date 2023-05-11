import './App.scss'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Thinkings from './pages/Thinkings';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/thinks' element={<Thinkings/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;