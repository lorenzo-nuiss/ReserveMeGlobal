import { Box, Typography } from "@mui/material";

type TitleProps = {
  title: string;
  subtitle: string;
};

const Title = ({ title, subtitle }: TitleProps) => {
  return (
    <Box>
      <Typography align="center" variant="h6" className="txtLight">
        {subtitle}
      </Typography>
      <Typography
        align="center"
        variant="h3"
        gutterBottom
        sx={{ pb: 4, fontWeight: 500 }}
        color="textPrimary"
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Title;
