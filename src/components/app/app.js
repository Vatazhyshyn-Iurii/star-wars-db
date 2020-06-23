import React, { Component } from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from "../../serwices/swapi-service";
import { SwapiServiceProvider } from "../swapi-service-context";
import DummySwapiService from "../../serwices/dummy-swapi-service";
import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  LiginPage,
  SecretPage
} from '../pages';

import './app.css';
import StarshipDetails from "../sw-components/starship-details";

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false,
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  };

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ?
                        DummySwapiService : SwapiService;

      console.log('switched to', Service.name);

      return {
        swapiService: new Service()
      };
    });
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />

              <Switch>
                <Route path='/' exact render={() => <h2 className='welcome'>Welcome to StarBD</h2>} />
                <Route path='/people/:id?' component={PeoplePage} />
                <Route path='/planets' component={PlanetsPage} />
                <Route path='/starships' exact component={StarshipsPage} />
                <Route path='/starships/:id'
                       render={ ({ match }) => {
                         const { id } = match.params;

                         return <StarshipDetails itemId={id} />
                       }} />
                <Route path='/login'
                       render={() => (
                         <LiginPage
                           isLoggedIn={isLoggedIn}
                           onLogin={this.onLogin} />
                         )} />
                <Route path='/secret'
                       render={() => (
                         <SecretPage isLoggedIn={isLoggedIn} />
                         )} />
                <Redirect to='/' />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
