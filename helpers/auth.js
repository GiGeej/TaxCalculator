const auth = (req, res, next) => {
    if(!req.session.logged_in) {
        console.log("Invalid Session, Logging Out");
        res.redirect('/'); 
    } else {
        next();
    }
};

module.exports = auth;