import { withAuth } from "next-auth/middleware"
// middleware is applied to all routes, use conditionals to select

export default withAuth(
    function middleware(req) {
    },
    {
        callbacks: {
            authorized: async ({ req, token }) => {
                const path = req.nextUrl.pathname;
                if (path.startsWith('/admin')) {
                    if (token?.role === 'ADMIN') return true;
                    return false;
                }
                if (token !== null || path.startsWith('/auth') || path.startsWith('/api/user'))
                    return true
                return false
            }
        }
    }
)