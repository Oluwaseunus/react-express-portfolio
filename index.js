const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 8080;

// Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

// Production mode
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
	//
	app.get('*', (req, res) => {
		res.sendfile(path.join((__dirname = 'client/build/index.html')));
	});
}

// Build mode
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, () => {
	console.log(`We are live on port ${port}`);
});

app.post('/api/v1', async (req, res) => {
	console.log('Request started', req.body);

	const output = `
		<p>You have a new message from your Portfolio</p>
		<h3>Message Details</h3>
		<ul>
			<li>Name: ${req.body.name}</li>
			<li>Email: ${req.body.email}</li>
		</ul>
		<h3>Message</h3>
		<p>${req.body.message}</p>
	`;

	// Create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'seun.message.handler@gmail.com',
			pass: 'messageHandler'
		}
	});

	// Setup email data with unicode symbols
	let mailOptions = {
		from: `"Nodemailer Contact" <seun.message.handler@gmail.com>`, // Sender address
		to: 'oluwaseunus@gmail.com', // List of receivers
		subject: 'Portfolio Contact Form', // Subject line
		text: 'Hello world?', // Plain text body
		html: output // Html body
	};

	// Send mail with defined transport object
	let info = await transporter.sendMail(mailOptions, err => {
		if (err) throw err;
	});

	res.send('Done');
});
