import { Box, Typography, Stack } from "@mui/material";

const About = () => {
  return (
    <Box
      className="about-container"
      sx={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        textAlign: "center",
        background: "linear-gradient(135deg, #f9f9f9 30%, #e0e0e0 100%)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        About Us
      </Typography>
      <Stack spacing={3} sx={{ maxWidth: "800px" }}>
        {/* Other content here */}
        Welcome to Blossom Flower Store! We are passionate about delivering the
        finest flowers and creating memorable experiences for every special
        occasion. Whether you're celebrating a wedding, birthday, anniversary,
        or simply brightening someone's day, our wide selection of hand-crafted
        bouquets and arrangements are designed to suit your needs. Established
        in 2024, we pride ourselves on offering beautiful floral arrangements
        using fresh, high-quality flowers sourced from the best growers. Our
        dedicated florists bring creativity and care to every bouquet, ensuring
        that your flowers leave a lasting impression. In addition to our
        extensive flower collection, we offer a range of services including
        same-day delivery, event floral design for weddings and corporate
        events, and personalized gift sets for special occasions. At Blossom,
        our mission is simple: to spread joy through the beauty of flowers. We
        believe in the power of flowers to express emotions, celebrate
        milestones, and create lasting memories.
      </Stack>

      {/* Images Section */}
      <Stack
        direction="row"
        spacing={3}
        sx={{ marginTop: "40px", justifyContent: "center" }}
      >
        {[
          "/img/blog/13.jpg",,
          "/img/blog/11.jpg",
          "/img/blog/12.jpg",
        ].map((src, index) => (
          <Box
            key={index}
            component="img"
            src={src}
            alt={`Description ${index + 1}`}
            sx={{
              width: "150px",
              borderRadius: "8px",
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
