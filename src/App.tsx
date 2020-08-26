import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { enableMapSet } from 'immer';
import { Container } from 'react-bootstrap';
import { TaskProvider } from 'context';
import * as Pages from 'pages';
import { constants } from 'shared';

/**
 * Enable support for Map and Set objects with Immer
 */
enableMapSet();

function App() {
  return (
    <Router basename={process.env.REACT_APP_BASENAME}>
      <Container fluid>
        <TaskProvider>
          <Switch>
            <Route exact path={constants.Routes.Root}>
              <Pages.Root />
            </Route>
            <Route path={constants.Routes.Others}>
              <Pages.NoMatch />
            </Route>
          </Switch>
        </TaskProvider>
      </Container>
    </Router>
  );
}

export default App;
