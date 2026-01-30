import { User } from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const register = async (req, res) => {

    try {
        const { username, password, department, org_id, role } = req.body;
        const findUser = await User.findOne({ username: username })
        if (!findUser) {
            const hashpassword = await bcrypt.hash(password, 10)
            const newUser = new User({ username: username, password: hashpassword, org_id: org_id, department: department, role: role })
            await newUser.save();
            return res.status(200).json({ message: "User registered successfully" })
        }
        else {
            return res.status(400).json({ message: "User Already Exists" })
        }
    } catch (error) {
        console.error(error)
    }

}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const findUser = await User.findOne({ username: username })
        if (findUser) {
            const isMatch = await bcrypt.compare(password, findUser.password)
            if (isMatch) {
                const payload = {
                    id: findUser._id,
                    org_id: findUser.org_id,
                    role: findUser.role,
                    department: findUser.department,
                    username: findUser.username
                }
                const token = jwt.sign(payload, process.env.MY_SECRET, { expiresIn: '24h' })
                return res.status(200).json({ message: token, role: findUser.role, user: payload })

            } else {
                return res.status(401).json({ message: "Invalid Credentials!" })
            }
        }
        else {
            return res.status(401).json({ message: "Invalid Credentials!" })
        }

    } catch (error) {
        console.error(error.message)
    }
}

export { register, login };
