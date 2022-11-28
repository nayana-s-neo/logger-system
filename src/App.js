import {Route,BrowserRouter as Router, Routes} from "react-router-dom";
import './App.css';
import List from './components/List';

function App() {
  return (
    <div className="App">
      <h2>Logger System</h2>
      <Router>
        <Routes>
          <Route  path='/' element={<List />} />
          <Route  path='/logger' element={<List />} />
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
