import React, { Component } from 'react';
import AOS from 'aos';
import axios from 'axios';
import 'aos/dist/aos.css';
import './styles.css';
import './helpers.js';

class App extends Component {
	state = {
		name: '',
		email: '',
		message: '',
		sent: false,
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

		this.setState({ buttonText: '...sending' });

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
			<div className='App'>
				<header className='header'>
					<div className='header__main'>
						<div className='header__main-profile' />
						<div className='header__main-details'>
							<h1 className='header__main-name'>Hi, I'm Seun Adetunji</h1>
							<div className='header__main-line' />
							<p className='header__main-occupation'>
								A Front-End Web Developer
							</p>
						</div>
					</div>
				</header>
				<section className='section__about'>
					<div className='row'>
						<div className='col-1-of-2'>
							<div
								className='section__about-image section__about-image-1'
								data-aos='fade-right'>
								&nbsp;
							</div>
						</div>
						<div className='col-1-of-2'>
							<div className='section__about-major' data-aos='fade-left'>
								<h2 className='section__about-header u-margin-bottom-medium'>
									About Me
								</h2>
								<p className='section__about-text'>
									I am a passionate and driven programming enthusiast who spends
									most of his time exploring new ways to make better products
									for the web. I also enjoy creating user interfaces and
									experiences with the power of code.
								</p>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-1-of-2'>
							<div className='section__about-major' data-aos='fade-right'>
								<h2 className='section__about-header u-margin-bottom-medium'>
									&nbsp;
								</h2>
								<p className='section__about-text'>
									I am familiar with various technologies that not only allow me
									to properly visualize what I want to create, but also to
									understand the specific needs of a project, along with the
									best practices to ensure that the project requirements are
									properly met.
								</p>
							</div>
						</div>
						<div className='col-1-of-2'>
							<div
								className='section__about-image section__about-image-2'
								data-aos='fade-left'>
								&nbsp;
							</div>
						</div>
					</div>
				</section>
				<section className='section__tech'>
					<h2 className='u-margin-bottom-big'>
						These are the technologies I use most often:
					</h2>
					<div className='row'>
						<div className='col-1-of-4' data-aos='fade-up'>
							<div className='section__tech-image section__tech-image-1' />
							<p>HTML5</p>
						</div>

						<div className='col-1-of-4' data-aos='fade-up'>
							<div className='section__tech-image section__tech-image-2' />
							<p>CSS3</p>
						</div>

						<div className='col-1-of-4' data-aos='fade-up'>
							<div className='section__tech-image section__tech-image-3' />
							<p>JavaScript</p>
						</div>

						<div className='col-1-of-4' data-aos='fade-up'>
							<div className='section__tech-image section__tech-image-4' />
							<p>Bootstrap</p>
						</div>
					</div>
					<div className='row'>
						<div className='col-1-of-4' data-aos='fade-up'>
							<div className='section__tech-image section__tech-image-5' />
							<p>jQuery</p>
						</div>

						<div className='col-1-of-4' data-aos='fade-up'>
							<div className='section__tech-image section__tech-image-6' />
							<p>React</p>
						</div>

						<div className='col-1-of-4' data-aos='fade-up'>
							<div className='section__tech-image section__tech-image-7' />
							<p>Sass</p>
						</div>

						<div className='col-1-of-4' data-aos='fade-up'>
							<div className='section__tech-image section__tech-image-8' />
							<p>Redux</p>
						</div>
					</div>
				</section>

				<section className='section__form'>
					<h2 className='u-margin-bottom-big'>Contact Me</h2>
					<div className='row'>
						<div className='col-1-of-2'>
							<form onSubmit={this.handleSubmit} data-aos='flip-right'>
								<input
									type='text'
									name='name'
									placeholder='First name'
									value={this.state.name}
									onChange={this.handleChange}
								/>
								<input
									type='email'
									name='email'
									placeholder='Email address'
									value={this.state.email}
									onChange={this.handleChange}
								/>
								<textarea
									name='message'
									cols='30'
									rows='5'
									value={this.state.message}
									onChange={this.handleChange}
								/>
								<input type='submit' value={this.state.buttonText} />
							</form>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default App;

// "start": "react-scripts start",
