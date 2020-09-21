import React  from 'react';
import { Container } from 'reactstrap'
import { ContextWrapper } from './user-context';
import Routes from './routes'

import './App.css';

function App() {
  
  return (
    <ContextWrapper>
      <Container>
        <div className="container">
          <Routes />
      </div>
      </Container>
    </ContextWrapper>
  );
}

export default App;