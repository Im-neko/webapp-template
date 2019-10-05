"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
exports.router = router;
const multer_1 = __importDefault(require("multer"));
const jwt_1 = require("../config/jwt");
const module_service_1 = require("../services/module.service");
const module_controller_1 = require("../controllers/module.controller");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(undefined, "upload/module/images/");
    },
    filename: function (req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
                return cb(new Error("Only image files are allowed!"), "failed");
            }
            const moduleService = new module_service_1.ModuleService();
            const latestId = yield moduleService.getLatestImageId();
            const filename = (latestId + 1) + file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)[0];
            cb(undefined, filename);
        });
    }
});
const uploads = multer_1.default({ storage: storage });
router.get("/", module_controller_1.getModules);
router.get("/:id", module_controller_1.getModuleById);
router.get("/image/:id", module_controller_1.getModuleImageById);
router.use(jwt_1.checkJWT);
router.post("/", uploads.single("image"), module_controller_1.postModule);
router.post("/image", uploads.single("image"), module_controller_1.postModuleImage);
//# sourceMappingURL=module.routes.js.map