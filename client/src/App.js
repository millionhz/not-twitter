import React from 'react';

function App() {
  const appStyle = {
    textAlign: 'center',
  };

  const headerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    color: 'black',
  };

  return (
    <div className="App" style={appStyle}>
      <header className="App-header" style={headerStyle}>
        <h1>Hello</h1>
      </header>
    </div>
  );
}

export default App;
