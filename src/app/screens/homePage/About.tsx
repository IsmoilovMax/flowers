import { Box, Typography, Stack } from "@mui/material";

const About = () => {
  return (
    <Box
      className="about-container"
      sx={{
        height: "80vh", // Increased height for better spacing
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px", // Added padding for a spacious layout
        textAlign: "center",
        background: "linear-gradient(135deg, #ffffff 30%, #e0f7fa 100%)", // Lighter gradient
        boxShadow: "0 8px 40px rgba(0, 0, 0, 0.1)", // More pronounced shadow
        borderRadius: "10px", // Rounded corners for a softer look
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 700, // Bold text for emphasis
          color: "#00796b", // Primary color for text
          marginBottom: "20px", // Spacing below title
        }}
      >
        About Us
      </Typography>
      <Stack spacing={4} sx={{ maxWidth: "800px", lineHeight: "1.6" }}>
        <Typography variant="body1" sx={{ color: "#555" }}>
          Welcome to Blossom Flower Store! We are passionate about delivering the
          finest flowers and creating memorable experiences for every special
          occasion. Whether you're celebrating a wedding, birthday, anniversary,
          or simply brightening someone's day, our wide selection of hand-crafted
          bouquets and arrangements are designed to suit your needs.
        </Typography>
        <Typography variant="body1" sx={{ color: "#555" }}>
          Established in 2024, we pride ourselves on offering beautiful floral
          arrangements using fresh, high-quality flowers sourced from the best
          growers. Our dedicated florists bring creativity and care to every bouquet,
          ensuring that your flowers leave a lasting impression.
        </Typography>
        <Typography variant="body1" sx={{ color: "#555" }}>
          At Blossom, our mission is simple: to spread joy through the beauty of flowers.
          We believe in the power of flowers to express emotions, celebrate milestones,
          and create lasting memories.
        </Typography>
      </Stack>

      {/* Images Section */}
      <Stack
        direction="row"
        spacing={3}
        sx={{ marginTop: "40px", justifyContent: "center" }}
      >
        {[
          "/img/blog/13.jpg",
          "/img/blog/11.jpg",
          "/img/blog/12.jpg",
        ].map((src, index) => (
          <Box
            key={index}
            component="img"
            src={src}
            alt={`Description ${index + 1}`}
            sx={{
              width: "180px", // Slightly larger images
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default About;
