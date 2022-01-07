import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {Layout, PrivateRoute} from './components';
import {AuthProvider, ModalProvider} from './context';
import {HomePage, LoginPage, RegisterPage} from "./views";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
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
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
