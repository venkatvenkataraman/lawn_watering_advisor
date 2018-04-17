import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import WeatherForecast from "./Weather";
import ZoneInfo from "./Zone";
import Dashboard from "./Dashboard";
import Test from "./pages/Test/Test";


class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return(
				<BrowserRouter>	
					<div className="container">
						<Header />
						<Route exact path="/" component={Test} />
						<Route exact path="/test" component={Test} />
						<Route exact path="/Zone" component={ZoneInfo} />
						<Route exact path="/WF" component={WeatherForecast} />
						<Route exact path="/Dashboard" component={Dashboard} />
					</div>
				</BrowserRouter>
		);
	}
};

export default connect(null, actions)(App);