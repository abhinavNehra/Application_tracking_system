import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout('./layout/auth.tsx', [
        route("login", "./pages/auth/login.tsx"),
        route("sign-up", "./pages/auth/sign-up.tsx")
    ]),
    layout("./layout/main.tsx", [
        index("./pages/home/index.tsx"),
        route("kanban", "./pages/kanban-board/index.tsx")
    ])

] satisfies RouteConfig;
