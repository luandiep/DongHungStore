const jwtVariable = require('../variables/jwt')
const authMethod = require('../auth/auth.methods')
const Users = require('../models')

exports.refreshToken = async (req, res) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.headers.x_authorization
    if (!accessTokenFromHeader) {
        return res.status(400).send('Không tìm thấy access token.')
    }

    // Lấy refresh token từ body
    const refreshTokenFromBody = req.body.refreshToken
    if (!refreshTokenFromBody) {
        return res.status(400).send('Không tìm thấy refresh token.')
    }

    const accessTokenSecret =
        process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret
    const accessTokenLife =
        process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife

    // Decode access token đó
    const decoded = await authMethod.decodeToken(
        accessTokenFromHeader,
        accessTokenSecret
    )
    if (!decoded) {
        return res.status(400).send('Access token không hợp lệ.')
    }

    const username = decoded.payload.username // Lấy username từ payload

    const user = await Users.users.findOne({
        where: { username: username },
        raw: true,
        nest: true,
    })
    if (!user) {
        return res.status(401).send('User không tồn tại.')
    }

    if (refreshTokenFromBody !== user.refreshToken) {
        return res.status(400).send('Refresh token không hợp lệ.')
    }

    // Tạo access token mới
    const dataForAccessToken = {
        username,
        id: user.id,
    }

    const accessToken = authMethod.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife
    )
    if (!accessToken) {
        return res
            .status(400)
            .send('Tạo access token không thành công, vui lòng thử lại.')
    } else {
        user.accessToken = accessToken
        return res.json({ user })
    }
}
