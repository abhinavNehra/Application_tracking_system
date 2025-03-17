import { Outlet, redirect } from "react-router";
import api from "../utils/api";

import type { Route } from "../layout/+types/auth";
import { Box, AppBar, Toolbar, Container } from "@mui/material";

export async function loader(params: Route.LoaderArgs) {
  // Call api to check if user is login or not
  const result = await api({
    url: "/api/user",
    method: "GET",
  });

  if (result?.success) {
    return redirect("/");
  }
}

export default function AuthLayout({}: Route.ComponentProps) {
  return (
    <Box>
      <AppBar position="static">
      <Toolbar disableGutters>
            <Box>
              <h1>LOGO</h1>
            </Box>
          </Toolbar>
        {/* <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box>
              <h1>L</h1>
            </Box>
          </Toolbar>
        </Container> */}
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </Box>
  );
}
