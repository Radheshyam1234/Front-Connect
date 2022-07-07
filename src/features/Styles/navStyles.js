import { styled, alpha } from "@mui/material/styles";
import { InputBase } from "@mui/material";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  marginRight: theme.spacing(2),
  marginLeft: 10,
  background: "rgb(245, 245, 246)",
  color: "#696b79",
  borderRadius: "10px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(10),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const AppTitleStyle = {
  variant: "h6",
  component: "div",
  sx: {
    display: {
      xs: "none",
      sm: "block",
      color: "#d80230",
      padding: "1rem",
      fontSize: "1.2rem ",
      fontWeight: "bold",
    },
  },
};

export const NavStyle = {
  sx: { backgroundColor: "#fff", boxShadow: "10px 4px rgb(0 0 0 / 5%)" },
};

export const IconButtonStyle = {
  size: "large",
  sx: { color: "#696b79" },
};
