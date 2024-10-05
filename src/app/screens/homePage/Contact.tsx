// src/components/Contact.tsx

import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contactData = { name, email, message };

    // You can send the contactData to your backend here
    console.log("Contact data submitted:", contactData);

    // Reset the form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Container sx={{ 
        width: "1300px",
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        textAlign: "center",
        background: "linear-gradient(135deg, #f9f9f9 30%, #e0e0e0 100%)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
     }}> {/* Increased margin-top for more space */}
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Send Message
        </Button>
      </Box>
    </Container>
  );
};

export default Contact;
