import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {Layout, PrivateRoute} from "./components";
import {AuthProvider} from './context/context';
import {HomePage, LoginPage, RegisterPage} from "./views";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Switch>
            <PrivateRoute exact={true} path="/" component={HomePage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={RegisterPage}/>
            <Redirect from="*" to="/"/>
          </Switch>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
