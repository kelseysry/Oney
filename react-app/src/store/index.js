import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import product from './product'
import review from './review'
import category from './category'
import searchResults from './search'
import cartReducer from './cart';
import address from './address';
import credit from './credit';
import navigation from './navigation'

const rootReducer = combineReducers({
  session,
  product,
  review,
  category,
  searchResults,
  cart : cartReducer,
  address,
  credit,
  navigation
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
