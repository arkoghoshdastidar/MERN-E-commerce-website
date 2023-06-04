const sendToken = function (res, statusCode, user) {
    const token = user.getToken();
    res.status(statusCode).cookie("token", token, {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        )
    }).json({
        success: true,
        token
    })
}

module.exports = sendToken;