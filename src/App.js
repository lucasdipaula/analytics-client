import React, { useState } from "react";

import Routes from "./Routes";

function App() {
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('token')));

  return (
    <Routes loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
  );
}

export default App;
