const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

// Static file declaration
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Production mode
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client', 'build')));
	//
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
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
	console.log('We are live on port 5000');
});

/* app.get('/', (req, res) => {
	res.send('Welcome to my api');
}); */

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

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'seun.message.handler@gmail.com',
			pass: 'messageHandler'
		}
	});

	// setup email data with unicode symbols
	let mailOptions = {
		from: `"${req.body.name}" <seun.message.handler@gmail.com>`, // sender address
		to: 'oluwaseunus@gmail.com', // list of receivers
		subject: 'Portfolio Contact Form', // Subject line
		text: 'Hello world?', // plain text body
		html: output // html body
	};

	// send mail with defined transport object
	let info = await transporter.sendMail(mailOptions);

	console.log('Message sent: %s', info.messageId);
	// Preview only available when sending through an Ethereal account
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

	res.send('Done');
});
