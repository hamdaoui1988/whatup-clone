
import './App.css';
import Sidebar from './Sidebar'
import Chat from './Chat'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useState } from 'react';
import Login from './Login'
import { useStateValue } from './StateProvider';

function App() {

  const [{ user }, dispatch] = useStateValue();

  
  return (
    <div className="App">

      {!user ? (
         <Login />
       ) : (

        <div className="app__body">
     
        <Router>
          <Switch>
            
              <Route path="/rooms/:roomId">
              <Sidebar />
              <Chat />
              </Route>

              <Route path="/">
              <Sidebar />
              <Chat />
              </Route>

          </Switch>
        

        </Router>

      </div>

      )}
     
    </div>
  );
}

export default App;
