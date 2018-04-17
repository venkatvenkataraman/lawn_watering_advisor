import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import WeatherForecast from "./Weather";
import ZoneInfo from "./Zone";
import Dashboard from "./Dashboard";


class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return(
				<BrowserRouter>	
					<div className="container">
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/Zone" component={ZoneInfo} />
						<Route exact path="/WF" component={WeatherForecast} />
						<Route exact path="/Dashboard" component={Dashboard} />
					</div>
				</BrowserRouter>
		);
	}
};

export default connect(null, actions)(App);