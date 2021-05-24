import React, { useState } from 'react';
import './App.css';
import { InputGroup, Input, InputGroupAddon, FormGroup, Label } from 'reactstrap';
import { toast, ToastContainer, Toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function App() {
  const [maxResults, setMaxResults] = useState(10);
  const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([])
  function handleSubmit() {
    setLoading(true);
    if (maxResults > 40 || maxResults < 1) {
      toast.error("O valor de resultados está fora do intervalo")
    } else {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`).then(res => {
        if (startIndex >= res.data.totalItems || startIndex < 1) {
          toast.error(`Máximo de resultados superior ao esperado`)
        } else {
          if (res.data.items.length > 0) {
            setCards(res.data.items);
            setLoading(false);
            console.log('cards', cards)
          }
        }
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    }

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

  return <div>
    {mainHeader()}
    <ToastContainer />
  </div>;
}

export default App;
