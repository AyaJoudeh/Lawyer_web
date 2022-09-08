// Admin checking middleware

function admin(req, res, next) {
    const user = req.user;
    if (user.isAdmin) return next();
    res.redirect("/userCases?userId=" + user._id);

}

module.exports = { admin };