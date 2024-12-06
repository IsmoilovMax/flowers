import React from "react";
import { Box, Container, Stack, Tabs, Typography, Tab, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import "../../../css/help.css";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

export default function HelpPage() {
  const [value, setValue] = React.useState("1");

  /** HANDLERS **/
  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="help-page">
      <Container className="help-container">
        <TabContext value={value}>
          <Box className="help-menu" sx={{ mb: 2 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="help tabs"
              variant="fullWidth"
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Tab label="Terms" value="1" />
              <Tab label="FAQ" value="2" />
              <Tab label="Contact" value="3" />
            </Tabs>
          </Box>

          <Stack spacing={4} className="help-main-content">
            <TabPanel value="1">
              <Stack className="rules-box" spacing={2}>
                <Box className="rules-frame" sx={{ p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                  {terms.map((term, index) => (
                    <Typography key={index} variant="body1" sx={{ color: "#333" }}>
                      {term}
                    </Typography>
                  ))}
                </Box>
              </Stack>
            </TabPanel>
            <TabPanel value="2">
              <Stack spacing={2} className="accordion-menu">
                {faq.map((item, index) => (
                  <Accordion key={index} sx={{ boxShadow: "none", border: "1px solid #ddd" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index}-content`}
                      id={`panel${index}-header`}
                    >
                      <Typography variant="h6" sx={{ color: "#00796b" }}>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </TabPanel>
            <TabPanel value="3">
              <Stack className="admin-letter-box" spacing={2}>
                <Typography variant="h5" sx={{ color: "#00796b" }}>Contact Us!</Typography>
                <Typography variant="body1">Fill out the form below to send us a message!</Typography>
                <form action="/" method="get" className="admin-letter-frame">
                  <Stack spacing={2}>
                    <div className="admin-input-box">
                      <label>Your name</label>
                      <input
                        type="text"
                        name="memberNick"
                        placeholder="Type your name here"
                        required
                      />
                    </div>
                    <div className="admin-input-box">
                      <label>Your email</label>
                      <input
                        type="email"
                        name="memberEmail"
                        placeholder="Type your email here"
                        required
                      />
                    </div>
                    <div className="admin-input-box">
                      <label>Message</label>
                      <textarea
                        name="memberMsg"
                        placeholder="Your message"
                        required
                      ></textarea>
                    </div>
                    <Box display="flex" justifyContent="flex-end" sx={{ mt: 1 }}>
                      <Button type="submit" variant="contained" sx={{ bgcolor: "#00796b" }}>
                        Send
                      </Button>
                    </Box>
                  </Stack>
                </form>
              </Stack>
            </TabPanel>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
