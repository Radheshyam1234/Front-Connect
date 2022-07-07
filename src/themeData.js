export const colors = {
  primary: {
    50: "#fd4e74",
    100: "#fd3560",
    200: " #fd1c4d",
    300: "#fc0339",
    400: " #e30233",
    500: "#d80230",
    600: "#ca022d",
    700: "#c30931",
    800: " #aa082b",
    900: "#940725",
  },
  secondary: {
    50: "#e6e6e6",
    100: "#d9d9d9",
    200: "#bfbfbf",
    300: "#b3b3b3",
    400: "#a6a6a6",
    500: "#9e9e9e",
    600: "#999999",
    700: "#8c8c8c",
    800: " #808080",
    900: "#737373",
  },
};

export const fonts = {
  heading: "Open Sans",
  body: "Open Sans",
};

export const Button = {
  baseStyle: {
    py: "0.5rem",
    minW: 10,
    borderRadius: "md",
    fontWeight: "normal",
  },
  variants: {
    solidPrimary: {
      height: "auto",
      px: "1.5rem",
      color: "secondary.50",
      bg: "primary.500",
      _hover: { bg: "primary.800" },
      _active: {
        bg: "primary.800",
        transform: "scale(0.98)",
        borderColor: "primary.800",
      },
    },
    solidSecondary: {
      height: "auto",
      px: "1.5rem",

      bg: "secondary.50",
      _hover: { bg: "secondary.800", color: "white" },
    },

    outlinePrimary: {
      border: "1px solid",
      color: "primary.200",
      borderColor: "primary.200",
      borderRadius: "base",
      _hover: { bg: "primary.800", color: "white" },
      _active: {
        bg: "primary.800",
        color: "white",
        transform: "scale(0.98)",
      },
    },
    outlineSecondary: {
      color: "secondary.800",
      border: "1px solid",
      px: "1.5rem",
      height: "auto",
      borderColor: "secondary.600",
      _hover: { bg: "secondary.600", color: "secondary.50" },
      _active: {
        bg: "secondary.600",
        transform: "scale(0.98)",
        borderColor: "secondary.600",
        color: "secondary.900",
      },
    },
    blockPrimary: {
      w: "100%",
      d: "block",
      height: "auto",
      px: "1.5rem",
      color: "secondary.100",
      bg: "primary.700",
      _hover: { bg: "primary.800" },
      _active: {
        bg: "primary.900",
        transform: "scale(0.98)",
        borderColor: "primary.900",
      },
    },
    blockOutline: {
      d: "block",
      w: "100%",
      border: "1px solid",
      color: "primary.800",
      borderColor: "primary.700",
      borderRadius: "base",
      _hover: { bg: "primary.800", color: "white" },
      _active: {
        bg: "primary.800",
        color: "white",
        transform: "scale(0.98)",
      },
    },

    actionBtnIcon: {
      minW: "1.2rem",
      h: "1.2rem",
      my: "0.5rem",
      color: "secondary.500",
    },
    iconBtn: {
      as: "span",
      minW: "1.5rem",
      color: "secondary.700",
      height: "1.5rem",
      _hover: {
        color: "primary.900",
      },
      _active: {
        color: "primary.900",
      },
    },
  },
};

export const components = { Button };
