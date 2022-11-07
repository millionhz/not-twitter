import React, { useEffect } from 'react';

function App() {
  const [message, setMessage] = React.useState('Fetching...');

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, []);

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
        <h1>{message}</h1>
      </header>
    </div>
  );
}

export default App;
