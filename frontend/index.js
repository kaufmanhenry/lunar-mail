import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import routes from './routes';

import configureStore from './redux/configureStore';

const store = configureStore();

const RootStyles = styled.div`
  font-family: heebo, sans-serif;
  height: 100%;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

render((
  <Provider store={store}>
    <RootStyles>
      {routes}
    </RootStyles>
  </Provider>
), document.getElementById('root'));
