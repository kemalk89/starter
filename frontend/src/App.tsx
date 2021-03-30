import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import KeycloakService from './services/keycloak-service';
import { User, UserDataContext } from './contexts/user-data-context';
import { Username } from './components/user/username';

function App() {
  const [user, setUser] = useState<User>();
  const keycloakService = KeycloakService();

  useEffect(() => {
    keycloakService.init().then(result => {
      if (result != null) {
        setUser(result);
      }
    });
  }, []);

  function logout() {
    keycloakService.logout();
  }

  return (
    <UserDataContext.Provider value={{user}}>
      <div className="App">
        <Username />
        <button onClick={logout}>Logout</button>
      </div>
    </UserDataContext.Provider>

  );
}

export default App;
