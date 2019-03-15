import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReactReduxProvider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import whyDidYouUpdate from 'why-did-you-update';
import 'styles/main.scss';
import store from 'configureStore';
import history from 'utils/history';
import Firebase, { FirebaseContext } from 'firebase';
import App from 'App';

const { Provider: FirebaseProvider } = FirebaseContext;

ReactDOM.render(
  <ReactReduxProvider store={store}>
    <FirebaseProvider value={new Firebase()}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </FirebaseProvider>
  </ReactReduxProvider>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV !== 'production') {
  whyDidYouUpdate(React);
}
