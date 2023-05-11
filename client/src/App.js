import './App.scss'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Thoughts from './pages/Thoughts';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/thoughts' element={<Thoughts/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;