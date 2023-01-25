import { Typography, useTheme } from "@mui/material";

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography fontWeight="700" fontSize="1.7rem">
      Play<span style={{ color: "gold" }}>ON</span>
      <span style={{ color: theme.palette.primary.main }}>Flix</span>
    </Typography>
  );
};

export default Logo;
