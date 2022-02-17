import React, {useEffect, useState} from "react"
import './App.css';
import Header from './Header'
import Search from './Search'
import Popular from './Popular'

function App() {
  
  
  const [modal, setModal] = useState(false)
  const [currentMovie, setCurrentMovie] = useState({})
  const [module, setModule] = useState("popular")
  

  return (
    <div className="App">
      <Header 
      setModule={setModule}
      />
      {module === "popular" && <Popular 
      modal={modal}
      setModal={setModal}
      currentMovie={currentMovie}
      setCurrentMovie={setCurrentMovie}
      />}
      
      {module === "search" && <Search 
      modal={modal}
      setModal={setModal}
      currentMovie={currentMovie}
      setCurrentMovie={setCurrentMovie}
      />}
    </div>
  );
}

export default App;
