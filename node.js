const { exec } = require('child_process');

// Execute Node.js script to send email
exec('node sendEmail.js', (err, stdout, stderr) => {
    if (err) {
        console.error('Error executing sendEmail.js:', err);
    } else {
        console.log('Email sent to the newly added email address.');
    }
});
