// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

// Reducers
import * as reducers from './reducers';
reducers.routing = routerReducer;

// LocalStorage Helper
import * as localStore from './localStore';

// Components
import App from './components/App'
import VisibleCards from './components/VisibleCards'
import NewCardModal from './components/NewCardModal'
import EditCardModal from './components/EditCardModal'

// Store and sync with history object
// createStore(reducers, initialState)
const store = createStore(combineReducers(reducers), localStore.get());
const history = syncHistoryWithStore(browserHistory, store);

const routes = (
  <Route path='/' component={App}>
    <Route path='/deck/:deckId' component={VisibleCards}>
      <Route path='/deck/:deckId/new' component={NewCardModal} />
      <Route path='/deck/:deckId/study' component={NewCardModal} />
      <Route path='/deck/:deckId/edit/:cardId' component={EditCardModal} />
    </Route>
  </Route>
);

function run() {
  let state = store.getState();

  // Save local data
  localStore.set(state, ['decks', 'cards']);

  ReactDOM.render(<Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>, document.getElementById('root'));
}

run();
store.subscribe(run);