import {
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
  Grid,
  Box,
  Avatar,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LockOutlined } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import Paper from "@mui/material/Paper";

const theme = createTheme();

function LoginPage() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            Backgroundcolor: (t) =>
              t.palette.mode == "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Grid>
        <Grid item xs={12} sm={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "seconday.main" }}>
              <LockOutlined />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <Box component="form" noValidate sx={{ mt: 10 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="first name"
                    label="first name"
                    name="first name"
                    autoComplete="first name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id=""
                    label="last name"
                    name="last name"
                    autoComplete="last name"
                    autoFocus
                  />
                </Grid>
              </Grid>
              <TextField
                margin="nomarl"
                required
                fullWidth
                id="email"
                label="email address"
                name="email"
                autoComplete="email"
                autofocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="password"
                name="password"
                autoComplete="password"
                autoFocus
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="remember me"
              />
              <LoadingButton
                loading
                loadingIndicator="Loading...."
                type="submit"
                fullWidth
                variant="outlined"
                //sx={{ mt: 2, mb: 2 }}
                onClick={() => alert("click me")}
                endIcon={<SendIcon />}
              >
                Sign in
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Link href="#1" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#2" variant="body2">
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;
