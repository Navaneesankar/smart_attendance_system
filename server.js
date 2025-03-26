//IT CAN STORE THE DATA IN FIREBASE IN smart attendance system
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(express.json());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(require("./firebase.json")),
});

const db = admin.firestore();

// Function to generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// API to generate and store OTP in Firebase
app.post("/generate-otp", async (req, res) => {
  try {
    const { classId } = req.body;
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    await db.collection("otps").doc(classId).set({ otp, expiresAt });

    res.status(200).send({ otp, message: "OTP generated successfully!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// API to validate OTP and mark attendance
app.post("/mark-attendance", async (req, res) => {
  try {
    const { studentId, classId, otp } = req.body;
    const otpDoc = await db.collection("otps").doc(classId).get();

    if (!otpDoc.exists) {
      return res.status(400).send({ message: "Invalid OTP!" });
    }

    const { otp: validOtp, expiresAt } = otpDoc.data();

    if (Date.now() > expiresAt) {
      return res.status(400).send({ message: "OTP expired!" });
    }

    if (otp !== validOtp) {
      return res.status(400).send({ message: "Incorrect OTP!" });
    }

    // Store attendance in Firebase
    await db.collection("attendance").add({
      studentId,
      classId,
      timestamp: new Date().toISOString(),
    });

    res.status(200).send({ message: "Attendance marked successfully!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

