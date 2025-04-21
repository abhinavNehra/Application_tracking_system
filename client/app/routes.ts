import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
    layout('./layout/auth.tsx', [
        route("login", "./pages/auth/login.tsx"),
        route("sign-up", "./pages/auth/sign-up.tsx")
    ]),
    layout("./layout/main.tsx", [
        //index("./pages/home/index.tsx"),

        route("positions", "./pages/positions/index.tsx", [
            route("add", "./pages/positions/addPositionModal.tsx"),
            //route("details/:id", "./pages/home/positionDetailsModal.tsx")
        ]),

        route("kanban", "./pages/kanban-board/index.tsx"),
        route("upload", './pages/upload/index.tsx')
    ])

] satisfies RouteConfig;
