import { useState } from "react";
import Router from "components/Router";
import { authService } from "../firebase";

function App() {
  console.log(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.getAuth.currentUser);
  return <>
    <Router isLoggedIn={isLoggedIn}/>
    <footer>&copy;Wwitter {new Date().getFullYear()}</footer>
  </>;
}

export default App;
