import React, { useState } from 'react';
import './App.scss';
import {SearchBar} from "./components/SearchBar/SearchBar";
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import ItemsList from "./components/ItemsList/ItemsList";
import ItemDetail from "./components/ItemDetail/ItemDetail";
import Message from "./components/Message/Message";
import { ENDPOINTS } from './common/constants';

function App() {
    let history = useHistory();
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(false);

    const getResults = (query) => {
      setLoading(true);
      fetch(ENDPOINTS.BASE + `api/items?q=${query}`)
        .then(response => response.json())
        .then(response => {
          if (response.error) {
            console.error(response);
            setLoading(false);
            setResults({error: response});
          } else {
            setLoading(false);
            setResults(response);
            history.push(`/items?search=${query}`);
          }
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
          setResults({error: 'Connection lost'});
        });
    };

    return (
      <div className="App">
        <SearchBar onSubmit={(query) => getResults(query)}/>
        {
          loading ? '':
          <Switch>
            <Route exact path="/items">
            {
              results.error ? <Message error={true} message={'Hubo un problema buscando ese producto. Intente más tarde.'}/>
              : results.items ? results.items.length ?
                <ItemsList categories={results.categories} items={results.items}/>
              : <Message error={false}
                      message={'No encontramos resultados con lo que ingresaste. Intente buscar con otras palabras!'}/>
              : <Redirect to={"/"}/>
            }
            </Route>
            <Route path="/items/:id" component={ItemDetail} />
          </Switch>
        }
      </div>
    );
}

export default App;
