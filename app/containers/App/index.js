/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import ComparePage from 'containers/ComparePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { MenuSection } from 'components/MenuSection';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <BrowserRouter>
      <MenuSection />
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/compare" component={ComparePage} />
          <Route path="/" component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </div>
    </BrowserRouter>
  );
}
