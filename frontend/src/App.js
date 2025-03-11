
import './App.css';

import Header from './components/Header';
import AddStudent from './components/AddStudent';
import {BrowserRouter as Router,Route} from "react-router-dom"


function App() {
  return (
    <Router>
    <div>
     <Header/>

<Route path="/add" extract component={AddStudent}/>

     <AddStudent/>
    </div>
    </Router>
  );
}

export default App;