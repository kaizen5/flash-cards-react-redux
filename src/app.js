// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import {fetchData} from './actions';

// Reducers
import * as reducers from './reducers';
reducers.routing = routerReducer;

// LocalStorage Helper
// import * as localStore from './localStore';

// Components
import App from './components/App';
import VisibleCards from './components/VisibleCards';
import NewCardModal from './components/NewCardModal';
import EditCardModal from './components/EditCardModal';
import StudyModal from './components/StudyModal';

// Store and sync with history object
// createStore(reducers, initialState)
// const store = createStore(combineReducers(reducers), localStore.get());
const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware));
const history = syncHistoryWithStore(browserHistory, store);

const routes = (
  <Route path='/' component={App}>
    <Route path='/deck/:deckId' component={VisibleCards}>
      <Route path='/deck/:deckId/new' component={NewCardModal} />
      <Route path='/deck/:deckId/edit/:cardId' component={EditCardModal} />
      <Route path='/deck/:deckId/study' component={StudyModal} />
    </Route>
  </Route>
);

function run() {
  let state = store.getState();

  // Save local data
  // localStore.set(state, ['decks', 'cards']);
  // fetch('/api/data')
  //   .then(() => )

  ReactDOM.render(<Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>, document.getElementById('root'));
}

function save() {
  var state = store.getState();

  // Save current state and take in new state.
  // Compare only the items that have changed, and
  // if the import data has changed (no view data),
  // then post an update.

  fetch('/api/data', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      decks: state.decks,
      cards: state.cards
    })
  });
}

function init() {
  run();
  store.subscribe(run);
  store.subscribe(save);
  store.dispatch(fetchData());
}

init();