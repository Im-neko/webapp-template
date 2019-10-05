"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const lusca_1 = __importDefault(require("lusca"));
// Controllers (route handlers)
const user_routes_1 = require("./routes/user.routes");
const module_routes_1 = require("./routes/module.routes");
const building_routes_1 = require("./routes/building.routes");
// Create Express server
const app = express_1.default();
// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(lusca_1.default.xframe("SAMEORIGIN"));
app.use(lusca_1.default.xssProtection(true));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", " x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    if (req.method == "OPTIONS") {
        res.json({ "error": undefined });
    }
    else {
        next();
    }
});
app.use((req, res, next) => {
    console.log("body, query", req.body, req.query);
    next();
});
app.use("/probe", (req, res) => {
    res.status(200).json({ message: "success", data: {}, error: false });
});
/**
 * Primary app routes.
 */
app.use("/user", user_routes_1.router);
app.use("/module", module_routes_1.router);
app.use("/building", building_routes_1.router);
// 404 error
app.use((req, res) => {
    const err = new Error("Not Found");
    res.status(404);
    res.json({ "error": true });
});
exports.default = app;
//# sourceMappingURL=app.js.map