import './App.css'
import {SearchBar} from "./SearchBar.tsx";
import React, {useReducer} from "react";
import {BirdRedcucer} from "./BirdRedcucer";
import {Favorites} from "./Favorites";

function App() {
    const [birds, dispatch] = useReducer(BirdRedcucer, []);

  return (
    <>
        <SearchBar/>
        {/*<SearchResults/>*/}
        <Favorites/>
    </>
  )
}

export default App
