import "./App.css";

import Header from "./components/Header";
import AddStudent from "./components/AddStudent";
import {  Route, Routes } from "react-router-dom";

function App() {
  return (
      <div className="App">
        <Header/>
        
        <Routes>
          <Route path="/add" element={<AddStudent/>} />
        </Routes>
        
        
      </div>
  );
}

export default App;
