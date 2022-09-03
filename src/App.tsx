import React, { useMemo, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from './routes';
import { LocalDataContext } from './core/context';
import localData from './core/reducers/localData';

export default function App() {

  const [store, dispatch] = useReducer(localData, { } || {});
  const contextValue = useMemo(() => ({ store, dispatch }), [store, dispatch]);

  return (
    <LocalDataContext.Provider value={contextValue}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </LocalDataContext.Provider>
  )
}
