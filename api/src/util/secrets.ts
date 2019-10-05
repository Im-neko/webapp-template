import logger from "./logger";
import fs from "fs";


export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "prod"; // Anything else is treated as 'dev'

export const SESSION_SECRET = "qaswdefrgthyjuikolp";

if (!SESSION_SECRET) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}
