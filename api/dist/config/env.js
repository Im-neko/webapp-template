"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = process.env.APP_ENV;
const SESSION_SECRET = env === "prod"
    ? "qaswdefrtgyhjuiklo"
    : "qaswdefrtgyhjuiklo";
exports.SESSION_SECRET = SESSION_SECRET;
const privKey = env === "prod"
    ? "/src/src/keys/jwt.key"
    : "./src/keys/jwt.key";
exports.privKey = privKey;
const pubKey = env === "prod"
    ? "/src/src/keys/jwt.key.pub"
    : "./src/keys/jwt.key.pub";
exports.pubKey = pubKey;
const apiUrl = env === "prod"
    ? process.env.API_URL
    : "http://localhost:3000";
exports.apiUrl = apiUrl;
//# sourceMappingURL=env.js.map