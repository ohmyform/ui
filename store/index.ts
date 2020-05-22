import {createWrapper, HYDRATE, MakeStore} from 'next-redux-wrapper'
import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

export interface State {
}

const state = {}

const root = (state: State, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

const makeStore: MakeStore<State> = (context) => {
  return createStore(
    (state, action): State => {
      const simple = combineReducers({
        // TODO add child reducers
      })

      return root(simple, action)
    },
    {},
    composeWithDevTools(applyMiddleware(
      thunkMiddleware,
    ))
  )
}

export const wrapper = createWrapper<State>(makeStore, {debug: true});

