import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import WeatherForecast from "./Weather";


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
						<Route exact path="/WF" component={WeatherForecast} />
					</div>
				</BrowserRouter>
		);
	}
};

export default connect(null, actions)(App);