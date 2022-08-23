import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SharedLayout from './SharedLayout';
import Ulubione from './Ulubione';
import Arena from './Arena'
import Home from './Home';
import SinglePokemon from './SinglePokemon';
import Rejestracja from './Rejestracja';
import Logowanie from './Logowanie';
import { SnackbarProvider } from 'notistack';
import { UserContext } from './context/UserContext'
import {useState} from 'react'
import Edycja from './Edycja';
import PrivateRoutes from './PrivateRoutes';


function App() {
  const [isLogged, setIsLogged] = useState(false)

  return (
    <UserContext.Provider value={{isLogged,setIsLogged}}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<SharedLayout />}>
              <Route index element={<Home />} />
              <Route path='home' element={<Home />} />
              <Route path='ulubione' element={<Ulubione />} />
              <Route path='arena' element={<Arena />} />
              <Route path="single_pokemon/:id" element={<SinglePokemon />} />
              <Route element = {<PrivateRoutes />}>
                <Route path="edycja" element={<Edycja />} />
              </Route>
              <Route path="rejestracja" element={<Rejestracja />} />
              <Route path="logowanie" element={<Logowanie />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </UserContext.Provider>
  );
}

export default App;
