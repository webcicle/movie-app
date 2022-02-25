import React, {useEffect, useState} from "react"
import './App.css';
import Header from './Header'
import Home from './Home'
import Search from './Search'
import Popular from './Popular'
import { getCastCrew } from "../getMovieInfo";

function App() {
  
  
  const [modal, setModal] = useState(false)
  const [currentMovie, setCurrentMovie] = useState([{id: 333}])
  const [module, setModule] = useState("home")
  const [castCrew, setCastCrew] = useState({})
  const [isOpen, setIsOpen] = useState(false)


  // useEffect(() => {
  //   getCastCrew(currentMovie[0].id, setCastCrew)
  // }, [currentMovie])
  

  return (
    <div className="App">
      <Header 
      setModule={setModule}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      />

      {module === "home" && <Home />}

      {module === "popular" && <Popular 
      modal={modal}
      setModal={setModal}
      currentMovie={currentMovie}
      setCurrentMovie={setCurrentMovie}
      castCrew={castCrew}
      setCastCrew={setCastCrew}
      />}
      
      {module === "search" && <Search 
      modal={modal}
      setModal={setModal}
      currentMovie={currentMovie}
      setCurrentMovie={setCurrentMovie}
      castCrew={castCrew}
      setCastCrew={setCastCrew}
      />}
    </div>
  );
}

export default App;
