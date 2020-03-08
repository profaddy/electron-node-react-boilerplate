import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMemoryHistory } from 'history';
import routes from './routes';
import theme from "./utils/theme";
// import configureStore from './store';
import { store, history } from "./mystore";
// import store from "./mystore";
// import { persistor } from "./mystore/store";
// import { PersistGate } from 'redux-persist/integration/react'



// const syncHistoryWithStore = (store, history) => {
//   const { router } = store.getState();
//   if (router && router.location) {
//     history.replace(router.location);
//   }
// };

// const initialState = {};
// const routerHistory = createMemoryHistory();
// const store = configureStore(initialState, routerHistory);
// syncHistoryWithStore(store, routerHistory);

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
    {/* <PersistGate  persistor={persistor}> */}
    <MuiThemeProvider theme={theme}>
      {routes}
      </MuiThemeProvider>

      {/* </PersistGate> */}
      </ConnectedRouter>
  </Provider>,
  rootElement
);
