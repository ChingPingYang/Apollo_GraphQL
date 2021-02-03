import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#768fff",
      main: "#2962ff",
      dark: "#0039cb",
      contrastText: "#ffffff",
    },
  },
  overrides: {
    MuiButton: {
      root: {},
      textPrimary: {
        "&:hover": {
          backgroundColor: "red",
        },
      },
    },
  },
});

theme.props = {
  MuiButton: {
    disableElevation: true,
    disableRipple: true,
  },
};

theme.overrides = {
  MuiButton: {
    root: {
      borderRadius: "0px",
      marginTop: theme.spacing(1),
    },
  },
  MuiTypography: {
    root: {
      marginTop: theme.spacing(1),
    },
  },
};
