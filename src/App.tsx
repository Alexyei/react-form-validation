import React from 'react';
import './styles/App.scss';
import AppRouter, {Links} from "./router/AppRouter";

function App() {
  return (
      <>
          <header className="App-header">
              <Links></Links>
          </header>
          <div className="App">

              <AppRouter></AppRouter>
          </div>
      </>

  );
}

export default App;
