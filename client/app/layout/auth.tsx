import { Outlet } from "react-router";
import api from '../utils/api'

import type { Route } from "../+types/root";

// async function action({ request }: Route.ActionArgs) {
//     // Call api to check if user is login or not
// }

async function loader(params: Route.LoaderArgs) {
  // Call api to check if user is login or not
  const result = await api({
    url: "/api/user",
    method: "GET",
    body: {},
  })

    if (result.status >= 200 && result.status < 300) {
        return { user: await result.json() };
    }
}

export default (porps: Route.ComponentProps) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
