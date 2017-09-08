import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import { colors } from './components/ui/Variables';

import routes from './routes';

import configureStore from './redux/configureStore';

const store = configureStore();

const RootStyles = styled.div`
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial sans-serif;
  background-color: ${colors.white};
  color: ${colors.black};
  height: 100%;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  p {
    line-height: 1.6rem;
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
  }
`;

render((
  <Provider store={store}>
    <RootStyles>
      {routes}
    </RootStyles>
  </Provider>
), document.getElementById('root'));
