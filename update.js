const admin = require("firebase-admin");
const fs = require("fs");

// Initialize Firebase Admin SDK
const serviceAccount = require("./path/to/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://banca-info.firebaseio.com"
});

// Get a reference to the Firebase Realtime Database
const db = admin.database();
const emailRef = db.ref("emails"); // Change "emails" to the correct path in your database

// Listen for changes to the "emails" node
emailRef.on("child_added", (snapshot) => {
  const newEmail = snapshot.val();
  const email = newEmail.email; // Assuming the email is stored under a property called "email"

  // Append the new email address to the text file
  fs.appendFile("new_emails.txt", email + "\n", (err) => {
    if (err) {
      console.error("Error appending email to file:", err);
    } else {
      console.log("New email added to file:", email);
    }
  });
});
