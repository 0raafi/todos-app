import React, { useMemo, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { RestLink } from 'apollo-link-rest';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import AutoLogin from './components/AutoLogin';

import routes from './routes';
import cookie from './helpers/cookie';
import { LocalDataContext } from './core/context';
import localData from './core/reducers/localData';

export default function App() {
  const token = cookie.get('access_token');
  const restLink = new RestLink({
    uri: 'https://todos-project-api.herokuapp.com',
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    }
  });
  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink
  });

  const [store, dispatch] = useReducer(localData, {} || {});
  const contextValue = useMemo(() => ({ store, dispatch }), [store, dispatch]);

  return (
    <ApolloProvider client={client}>
      <AutoLogin>
        <LocalDataContext.Provider value={contextValue}>
          <BrowserRouter>
            {renderRoutes(routes)}
          </BrowserRouter>
        </LocalDataContext.Provider>
      </AutoLogin>
    </ApolloProvider>
  )
}
