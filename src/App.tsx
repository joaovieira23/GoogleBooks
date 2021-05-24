import React, { useState } from 'react';
import './App.css';
import { InputGroup, Input, InputGroupAddon, FormGroup, Label } from 'reactstrap';

function App() {
  const [maxResults, setMaxResults] = useState(10);
  const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit() {

  }

  const mainHeader = () => {
    return (
      <div className="main-image d-flex justify-content-center align-items-center flex-column">
        <div className="filter"></div>
        <h1 style={{ fontFamily: 'Poppins', color: '#CDCDCD' }} className="display-2 text-center text-white ab-3">
          Google Books
          </h1>
        <div style={{ width: '60%', zIndex: 2 }}>
          <InputGroup size="1g" className="mb-3">
            <Input placeholder="Busque seus livros" value={query} onChange={e => setQuery(e.target.value)} />
            <InputGroupAddon addonType="append">
              <div>
                <button onClick={handleSubmit} style={{ fontFamily: 'Poppins', height: 40 }}>Pesquisar</button>
              </div>
            </InputGroupAddon>
          </InputGroup>
          <div className="d-flex text-white justify-content-center">
            <FormGroup style={{ marginRight: 12 }} className="ml-5">
              <Label for="maxResults">Máximo de resultados</Label>
              {/*
        // @ts-ignore */}
              <Input type="number" id="maxResults" value={maxResults} onChange={e => setMaxResults(e.target.value)} placeholder="Máximo de resultados" />
            </FormGroup>

            <FormGroup className="ml-5">
              <Label for="startIndex">Índice Inicial</Label>
              {/*
      // @ts-ignore */}
              <Input type="number" id="startIndex" value={startIndex} onChange={e => setStartIndex(e.target.value)} placeholder="Índice Inicial" />
            </FormGroup>
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
