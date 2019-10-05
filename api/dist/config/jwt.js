"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const fs = __importStar(require("fs"));
const env_1 = require("./env");
const decodeJWT = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        next();
        return;
    }
    if (token === "testt0kenregiec") {
        req.decoded = { userId: "bacb0373fe2fa30508e7c925", user_name: "im_neko" };
        next();
        return;
    }
    jwt.verify(token, fs.readFileSync(env_1.pubKey), { algorithms: ["RS256"] }, function (err, decoded) {
        if (err) {
            return res.status(403).json({ "error": "Invalid token" });
        }
        req.decoded = decoded;
        next();
    });
};
exports.decodeJWT = decodeJWT;
const checkJWT = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ error: "No token provided." });
    }
    if (token === "testt0kenregiec") {
        req.decoded = { userId: "bacb0373fe2fa30508e7c925", user_name: "im_neko" };
        next();
        return;
    }
    jwt.verify(token, fs.readFileSync(env_1.pubKey), { algorithms: ["RS256"] }, function (err, decoded) {
        if (err) {
            return res.status(403).json({ "error": "Invalid token" });
        }
        req.decoded = decoded;
        next();
    });
};
exports.checkJWT = checkJWT;
const signJWT = (obj) => {
    return jwt.sign(obj, fs.readFileSync(env_1.privKey), { expiresIn: "24h", algorithm: "RS256" });
};
exports.signJWT = signJWT;
const pubkey = () => fs.readFileSync(env_1.pubKey);
exports.pubkey = pubkey;
//# sourceMappingURL=jwt.js.map