import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../services/authServices';
import ProtectedRoutes from './../common/protectedRoutes';
import LoginForm from './loginForm';
import Logout from './logout';
import MovieForm from './movieForm';
import Movies from './movies';
import MoviesNavbar from './moviesNavbar';
import Customers from './navbarComponents/customers';
import NotFound from './navbarComponents/notFound';
import Rentals from './navbarComponents/rentals';
import RegisterForm from './registerForm';
class VidlyApp extends Component {
    state = {};
    componentDidMount() {
        const user = auth.getCurrentUser()
        this.setState({ user })
    }
    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <MoviesNavbar user={this.state.user} />
                <main className="main">

                    <Switch>
                        <Route path="/register" component={RegisterForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/logout" component={Logout} />
                        {/* <Route path="/movies/:id" component={MovieForm} /> */}
                        <ProtectedRoutes
                            path="/movies/:id"
                            component={MovieForm}
                        />
                        {/* <Route path="/movies" component={Movies} /> */}
                        <Route
                            path="/movies"
                            render={props => <Movies {...props} user={this.state.user} />} />
                        <Route path="/customers" component={Customers} />
                        <Route path="/rentals" component={Rentals} />
                        <Route path="/not-found" component={NotFound} />
                        <Redirect from="/" exact to="/movies" />
                        <Redirect to="/not-found" />
                    </Switch>
                </main>
            </React.Fragment>
        )
    }
}
export default VidlyApp
