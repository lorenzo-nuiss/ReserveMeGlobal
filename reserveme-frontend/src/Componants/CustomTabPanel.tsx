import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}
export const CustomTabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};
