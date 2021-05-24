import React from 'react';
import './App.css';
import { InputGroup, Input, } from 'reactstrap';

function App() {
  const mainHeader = () => {
    return (
      <div className="main-image d-flex justify-content-center align-items-center flex-column">
        <div className="filter">
          <h1 style={{ fontFamily: 'Poppins', color: '#CDCDCD' }} className="display-2 text-center text-white ab-3">
            Google Books
          </h1>
          <div style={{ width: '60%' }}>
            <InputGroup size="1g" className="mb-3">
              <Input placeholder="Busque seus livros" />
            </InputGroup>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      {mainHeader()}
    </div>
  );
}

export default App;
