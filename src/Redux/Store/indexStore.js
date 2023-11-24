import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../Reducer/reducer";
import thunkMiddleware from "redux-thunk";



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'user',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))
);

const persistor = persistStore(store)

export { store, persistor };