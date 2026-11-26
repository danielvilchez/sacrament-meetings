import { auth } from "@/auth";

export const proxy = auth((request) => {
    const isLoggedIn = !!request.auth;

    if (!isLoggedIn) {
        const loginUrl = new URL("/login", request.nextUrl);
        loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
        return Response.redirect(loginUrl);
    }
});

export const config = {
    matcher: ["/meetings/new", "/meetings/:id/edit"],
};