const nodemailer = require('nodemailer');
const fs = require('fs');

// Read the newly added email from new_emails.txt file
fs.readFile('email_sender/new_emails.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error('Error reading file:', err);
    }

    // Extract the email address (assuming it's the last line in the file)
    const newEmail = data.trim().split('\n').pop();

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'support@bancaloan.com', // Your email address
            pass: 'Hustle001@'   // Your email password
        }
    });

    // Read the content of the HTML file
    fs.readFile('email.html', 'utf8', (err, emailContent) => {
        if (err) {
            return console.error('Error reading file:', err);
        }

        // Setup email data with the content of the HTML file and the newly added email as the recipient
        let mailOptions = {
            from: 'Banca Loan', // Sender address
            to: newEmail,  // Newly added email address as the recipient
            subject: 'Welcome to our website!', // Subject line
            html: emailContent // HTML content of the email
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Error occurred:', error);
            }
            console.log('Email sent successfully:', info.response);
        });
    });
});
