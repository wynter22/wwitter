import { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'utils/firebase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.getAuth.currentUser);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    const auth = authService.getAuth();
    authService.onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedIn(true);
        setUserObject(user);
      } else {
        setIsLoggedIn(false);
      }

      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObject={userObject} />
      ) : (
        'Initializing...'
      )}
      <footer>&copy;Wwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
