"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = (req, res, next) => {
    express_validator_1.check("email", "Email is not valid").isEmail();
    express_validator_1.check("password", "Password must be at least 4 characters long").isLength({ min: 4 });
    express_validator_1.check("confirmPassword", "Passwords do not match").equals(req.body.password);
    express_validator_1.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/signup");
    }
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            req.flash("errors", { msg: "Account with that email address already exists." });
            return res.redirect("/signup");
        }
        user.save((err) => {
            if (err) {
                return next(err);
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.redirect("/");
            });
        });
    });
};
//# sourceMappingURL=user.js.map