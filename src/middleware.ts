import { withAuth } from "next-auth/middleware"

// middleware is applied to all routes, use conditionals to select

export default withAuth(
    function middleware(req) {
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                if (token !== null || req.nextUrl.pathname.startsWith('/auth') || req.nextUrl.pathname.startsWith('/api/user'))
                    return true
                return false
            }
        }
    }
)