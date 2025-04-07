import "./App.css";
import Header from "./components/Header.jsx";
import AddStudent from "./components/AddStudent";
import {  Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
      <div className="App">
        <Header/>
        
        <Routes>
        <Route path="/" element={<Home age={'sdas'} name={'dfsdf'}/>} />
          <Route path="/add" element={<AddStudent/>} />
        </Routes>
        
        
      </div>
  );
}

export default App;
 