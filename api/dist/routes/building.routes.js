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
const building_service_1 = require("../services/building.service");
const building_controller_1 = require("../controllers/building.controller");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(undefined, "upload/building/images/");
    },
    filename: function (req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
                return cb(new Error("Only image files are allowed!"), "failed");
            }
            const buildingService = new building_service_1.BuildingService();
            const latestId = yield buildingService.getLatestImageId();
            const filename = (latestId + 1) + file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)[0];
            cb(undefined, filename);
        });
    }
});
const uploads = multer_1.default({ storage: storage });
router.get("/", building_controller_1.getBuildings);
router.get("/:id", building_controller_1.getBuildingById);
router.get("/image/:id", building_controller_1.getBuildingImageById);
router.use(jwt_1.checkJWT);
router.post("/", uploads.single("image"), building_controller_1.postBuilding);
router.post("/image", uploads.single("image"), building_controller_1.postBuildingImage);
router.post("/module", building_controller_1.addModule);
router.put("/image", uploads.single("image"), building_controller_1.updateImage);
router.put("/", building_controller_1.updateBuilding);
//# sourceMappingURL=building.routes.js.map