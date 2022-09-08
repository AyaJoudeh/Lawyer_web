//Checking user Authentication middleware 

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next();

    const user = req.user
    if (user.isAdmin) {
        res.redirect("/lawyers");
    } else {
        res.redirect("/userCases?userId=" + user._id);
    }
}

module.exports = { isLoggedIn, isLoggedOut };