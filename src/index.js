// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import React from 'react';
import { Redirect, Router, Route, hashHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Deploy from './Deploy';
import Application from './Application';
import Overview from './Overview';
import Transfer from './Transfer';

import '@parity/shared/assets/fonts/Roboto/font.css';
import '@parity/shared/assets/fonts/RobotoMono/font.css';
import './style.css';

injectTapEventPlugin();

const App = () => (
  <AppContainer>
    <Router history={ hashHistory }>
      <Redirect from='/' to='/overview' />
      <Route path='/' component={ Application }>
        <Route path='deploy' component={ Deploy } />
        <Route path='overview' component={ Overview } />
        <Route path='transfer' component={ Transfer } />
      </Route>
    </Router>
  </AppContainer>
);

export default App;
