import jwt from 'jsonwebtoken'

// auth middleware
const authUser = async (req, res, next) => {
    let token = req.headers.token

    // Strip "Bearer " prefix if sent
    if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1]
    }

    if (!token) {
        // Unregistered or not logged-in users
        req.body.userId = null
        return next()
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = decoded.id
        next()
    } catch (error) {
        console.log("JWT invalid or expired:", error.message)
        req.body.userId = null
        next()
    }
}

export default authUser
