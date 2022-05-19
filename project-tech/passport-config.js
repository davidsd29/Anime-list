const {
    compare
} = require('bcrypt')
const {
    authenticate
} = require('passport/lib')

const local = require('passport-local').Strategy

function initalize(passport) {
    const authenticateUser = (username, pws, done) => {
        const user = getUserByUsername(username)

        if (user == null) {
            return done(null, user)
        }

        try {
            if (compare(pws, user.pws)) {
                return done(null, false, {
                    message: 'Password incorrect'
                })
            } else {
                return done(null, false, {
                    message: 'Password incorrect'
                })
            }
        } catch (e) {
            return done(e)
        }

    }

    passport.use(new local({
        usernameField: 'username'
    }), authenticateUser)
    // to store user in session
    passport.serializeUser((user, done) => {})
    passport.deserializeUser((id, done) => {})
}

modules.exports = initalize