import React, { Component } from 'react';
import AOS from 'aos';
import axios from 'axios';
import 'aos/dist/aos.css';
import './helpers.js';

class App extends Component {
	state = {
		name: '',
		email: '',
		message: '',
		sent: false,
		formError: false,
		buttonText: 'Send Message'
	};

	componentDidMount = () => {
		AOS.init({
			startEvent: 'load',
			duration: 1500
		});
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		const { name, email, message } = this.state;

		if (!(name && email && message)) {
			this.setState({ formError: true });
		} else {
			this.setState({ buttonText: '...sending', formError: false });

			let data = {
				name: this.state.name,
				email: this.state.email,
				message: this.state.message
			};

			axios
				.post('/api/v1', data)
				.then(res => {
					this.setState({ sent: true }, this.resetForm());
				})
				.catch(() => this.setState({ buttonText: 'Message not sent' }));
		}
	};

	resetForm = () => {
		this.setState({
			name: '',
			email: '',
			message: '',
			buttonText: 'Message sent!'
		});
	};

	render() {
		return (
			<section className='section__form'>
				<h2 className='u-margin-bottom-big'>Contact Me</h2>
				<div className='row'>
					<div className='col-1-of-2'>
						<form onSubmit={this.handleSubmit}>
							<input
								type='text'
								name='name'
								placeholder='First name'
								value={this.state.name}
								data-aos='flip-right'
								onChange={this.handleChange}
							/>
							<input
								type='email'
								name='email'
								placeholder='Email address'
								value={this.state.email}
								data-aos='flip-right'
								onChange={this.handleChange}
							/>
							<textarea
								name='message'
								placeholder='Write your message here. 🙂'
								cols='30'
								rows='5'
								value={this.state.message}
								data-aos='flip-right'
								onChange={this.handleChange}
							/>
							<input
								type='submit'
								value={this.state.buttonText}
								data-aos='flip-right'
							/>
							{this.state.formError && (
								<p style={{ color: 'red', marginTop: '10px' }}>
									Please properly fill the form.
								</p>
							)}
						</form>
					</div>
				</div>
			</section>
		);
	}
}

export default App;
