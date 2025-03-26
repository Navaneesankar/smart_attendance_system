import React, { useState } from "react";
import "./App.css"; // Import the CSS file

function App() {
  const [classId, setClassId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const generateOtp = async () => {
    const response = await fetch("http://localhost:5000/generate-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classId }),
    });

    const result = await response.json();
    setGeneratedOtp(result.otp);
    alert(result.message);
  };

  const markAttendance = async () => {
    const response = await fetch("http://localhost:5000/mark-attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, classId, otp }),
    });

    const result = await response.json();
    alert(result.message);
  };

  return (
    <div className="container">
      <h1>Smart Attendance System</h1>

      <h3>Generate OTP (For Teachers)</h3>
      <input type="text" placeholder="Enter Class ID" value={classId} onChange={(e) => setClassId(e.target.value)} />
      <button onClick={generateOtp}>Generate OTP</button>
      {generatedOtp && <p>Generated OTP: {generatedOtp}</p>}

      <h3>Mark Attendance (For Students)</h3>
      <input type="text" placeholder="Enter Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
      <input type="text" placeholder="Enter Class ID" value={classId} onChange={(e) => setClassId(e.target.value)} />
      <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={markAttendance}>Mark Attendance</button>
    </div>
  );
}

export default App;
