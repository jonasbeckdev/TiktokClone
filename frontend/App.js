// import Constants from 'expo-constants';
// import * as firebase from 'firebase';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {Route} from 'navigation';
import rootReducer from 'reduxs/reducers';
import { LogBox } from 'react-native'


const store = createStore(rootReducer, applyMiddleware(thunk))

LogBox.ignoreAllLogs()

// if (firebase.apps.length === 0) {
//   firebase.initializeApp(Constants.manifest.web.config.firebase)
// } else {
//   firebase.app()
// }

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: false, staleTime: Infinity } }
})

export default function App() {
  return (
    <Provider store={store} >
      <QueryClientProvider client={queryClient}>
        <Route />
      </QueryClientProvider>
    </Provider>
  );
}
