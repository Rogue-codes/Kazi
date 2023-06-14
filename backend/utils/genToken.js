import jwt from 'jsonwebtoken'

export const genAuthToken = (res, userID) => {
    const token = jwt.sign({userID},process.env.JWT_SECRET,{
        expiresIn:"1d"
    })

    res.cookie("access_token",token,{
        httpOnly: true
    })
}