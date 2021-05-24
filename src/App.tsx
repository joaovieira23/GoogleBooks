import React, { useState } from 'react';
import './App.css';
import { InputGroup, Input, InputGroupAddon, FormGroup, Label, Spinner } from 'reactstrap';
import { toast, ToastContainer, Toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import BookCard from './components/BookCard';

interface IPropsBookCard {
  thumbnail: string;
  title: string;
  pageCount: number;
  language: string;
  description: string;
  authors: string;
  publisher: string;
  previewLink: string;
  infoLink: string;
  id: number;
  volumeInfo: {
    authors: string;
    language: string;
    title: string;
    subtitle: string;
    pageCount: number;
    previewLink: string;
    infoLink: string;
    publisher: string;
    description: string;

    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    }
  };
}

function App() {
  const [maxResults, setMaxResults] = useState(10);
  const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<IPropsBookCard[]>()
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
        setLoading(true);
        toast.error(`${err.response.data.error.message}`)
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

  const handleCards = () => {
    const items = cards?.map((item, i) => {
      let thumbnail = '';
      if (item.volumeInfo.imageLinks.thumbnail) {
        thumbnail = item.volumeInfo.imageLinks.thumbnail
      }

      return (
        <div className="col-lg-4" key={item.id}>
          <BookCard
            thumbnail={thumbnail}
            title={item.volumeInfo.title}
            pageCount={item.volumeInfo.pageCount}
            language={item.volumeInfo.language}
            authors={item.volumeInfo.authors}
            publisher={item.volumeInfo.publisher}
            description={item.volumeInfo.description}
            previewLink={item.volumeInfo.previewLink}
            infoLink={item.volumeInfo.infoLink}
          />
        </div>
      )
    })
    if (loading) {
      return (
        <div className="d-flex justify-content-center mt-3">
          <Spinner style={{ width: '3rem', height: '3rem' }} >
            ''
          </Spinner>
        </div>
      )
    } else {
      return (
        <div className="container my-5">
          <div className="row">{items}</div>
        </div>
      )
    }
  }

  return <div className="w-100 h-100">
    {mainHeader()}
    {handleCards()}
    <ToastContainer />
  </div>;
}

export default App;
