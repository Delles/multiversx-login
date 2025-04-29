import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Unlock from "./pages/Unlock/Unlock";
import { AuthGuard } from "./components/AuthGuard/AuthGuard";
import { NavBarLayout } from "./components/NavBarLayout";
import { CenterLayout } from "./components/CenterLayout";
import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/hooks/account/useGetIsLoggedIn";
export const routeNames = {
    dashboard: "dashboard",
    unlock: "unlock",
};

export const routes = createBrowserRouter([
    {
        path: routeNames.unlock,
        element: (
            <CenterLayout>
                <Unlock />
            </CenterLayout>
        ),
    },
    {
        path: routeNames.dashboard,
        element: (
            <AuthGuard>
                <NavBarLayout>
                    <Dashboard />
                </NavBarLayout>
            </AuthGuard>
        ),
    },
    {
        path: "/",
        Component: () => {
            const isLoggedIn = useGetIsLoggedIn();
            if (isLoggedIn) {
                return <Navigate to={routeNames.dashboard} />;
            }
            return <Navigate to={routeNames.unlock} />;
        },
    },
]);
