import { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from '../firebase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.getAuth.currentUser);

  useEffect(() => {
    const auth = authService.getAuth();
    authService.onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user);
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'}
      <footer>&copy;Wwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
