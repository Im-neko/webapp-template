"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
exports.ENVIRONMENT = process.env.NODE_ENV;
const prod = exports.ENVIRONMENT === "prod"; // Anything else is treated as 'dev'
exports.SESSION_SECRET = "qaswdefrgthyjuikolp";
if (!exports.SESSION_SECRET) {
    logger_1.default.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map