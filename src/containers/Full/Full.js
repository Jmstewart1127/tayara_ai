import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Footer from '../../components/Footer/';

import ContentBot from '../../views/ContentBot/';
import {EventEmitter} from  "fbemitter";

class Full extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emitter: new EventEmitter()
    };
  }
  render() {
    const params = new URLSearchParams(this.props.location.search);
    return (
      <div className="app">
        <Header emitter={this.state.emitter}/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb/>
            <Container fluid>
              <Switch>
                {/* <Route path="/dashboard" name="Dashboard" component={Dashboard}/> */}
                <PropsRoute path="/contentbot" name="ContentBot" component={ContentBot} emitter={this.state.emitter} params={params}/>
                <Redirect from="/" to="/contentbot"/>
              </Switch>
            </Container>
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
}

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

export default Full;
