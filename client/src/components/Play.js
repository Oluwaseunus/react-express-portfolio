import React, { Component } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

class Play extends Component {
	componentDidMount = () => {
		AOS.init();
	};

	render() {
		return (
			<div>
				<div style={{ width: '100vw', height: '100vh' }} />
				<div data-aos='fade-in'>Booyakasha!!!!</div>
				<div style={{ width: '100vw', height: '20vh' }} />
			</div>
		);
	}
}

export default Play;
