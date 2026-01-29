import jwt from 'jsonwebtoken'
const checkUser = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            if (token) {
                const decoded = jwt.verify(token, process.env.MY_SECRET)
                req.user = decoded
                next();
            }
        }
        else {
            res.status(401).json({ message: "No token, authorization denied" })
        }

    } catch (error) {
        res.status(401).json({ message: "Token is not valid" })
    }
}

export default checkUser;