import { useEffect, useState } from 'react';
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

        fetch('/api/products/2', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + result.token
          }
        })
        .then(r => r.json())
        .then(r => console.log(r));

        fetch('/api/orders/1', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + result.token
          }
        })
        .then(r => r.json())
        .then(r => console.log(r));
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
