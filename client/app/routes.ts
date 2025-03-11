import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout('./layout/auth.tsx', [
        route("login", "./components/auth/login.tsx"),
        route("sign-up", "./components/auth/sign-up.tsx")
    ]),
    layout("./layout/main.tsx", [
        index("./components/pages/home.tsx")
    ])

] satisfies RouteConfig;
