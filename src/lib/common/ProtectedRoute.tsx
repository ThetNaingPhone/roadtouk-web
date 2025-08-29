"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "../constants/routes";

interface Props {
    children: React.ReactNode;
}

const PUBLIC_ROUTES = ["/login", "/register"];

const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname(); // get current route
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        const isPublicRoute = PUBLIC_ROUTES.includes(pathname || "");

        if (!accessToken && !refreshToken && !isPublicRoute) {
            router.push(ROUTES.login); // redirect only from private routes
        } else {
            setAuthorized(true); // allow access
        }
    }, [pathname, router]);

    if (!authorized) return null;
    return <>{children}</>;
};

export default ProtectedRoute;
