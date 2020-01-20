import React from 'react';
import './App.css';
import {Inicio} from '../componentes/inicio/inicio';
import {AfiliadoDatos} from '../componentes/AfiliadoDatos/AfiliadoDatos';
import {Menu} from '../componentes/Menu/Menu';
import {BrowserRouter, Route, Switch, Router} from 'react-router-dom';
import { LoginPage } from '../LoginPage';
import {authenticationService} from '../Servicios/authentication-service'
import { history } from '../Utiles/history';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/Login');
    }

    render() {
    const { currentUser } = this.state;
    return (      
      <Router history={history}>
      <BrowserRouter>
        <div className="container">
        <h1>ART - Gestion Afiliados</h1>
        {currentUser &&
          <Menu/>
        }

        <Switch>
          <Route path='/' component={Inicio} exact/>
          <Route path='/AfiliadoDatos' component={AfiliadoDatos}/>
          <Route path='/Login' component={LoginPage}/>
        </Switch>  
        </div>
      </BrowserRouter>
      </Router>
    );
  }
}
export {App};
