import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { fetchCategories } from './actions'
import { BrowserRouter } from 'react-router-dom'

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose 

const store = createStore(
  reducer,
  composeEnhancers (
    applyMiddleware(thunk, logger)
  )
)

store.dispatch(fetchCategories())
//store.dispatch(fetchPosts())

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
