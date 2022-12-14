import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from './context/Modal';
import './index.css';
import App from './App';
import configureStore from './store';
import * as questionActions from './store/question'
import * as answerActions from './store/answer'
import * as tagActions from './store/tag'
import * as voteActions from './store/vote'

const store = configureStore();

if (process.env !== 'production') {
  window.store = store;
  window.questionActions = questionActions;
  window.answerActions = answerActions;
  window.tagActions = tagActions;
  window.voteActions = voteActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
