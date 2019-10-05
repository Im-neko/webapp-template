"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const building_service_1 = require("../services/building.service");
/**
 * GET /building
 * get buildings
 */
const getBuildings = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const buildingService = new building_service_1.BuildingService();
        const buildingEntites = yield buildingService.getBuildings();
        console.log(buildingEntites);
        res.status(200).json({ message: "success", data: buildingEntites, error: false });
    }
    catch (e) {
        console.error(e);
        res.status(e[0] || 500).json({ message: e[1] || "failed", data: {}, error: true });
    }
});
exports.getBuildings = getBuildings;
/**
 * GET /building/:id
 * get building by id
 */
const getBuildingById = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const buildingService = new building_service_1.BuildingService();
        const buildingData = yield buildingService.getBuildingById(req.params.id);
        res.status(200).json({ message: "success", data: buildingData, error: false });
    }
    catch (e) {
        console.error(e);
        res.status(e[0] || 500).json({ message: e[1] || "failed", data: {}, error: true });
    }
});
exports.getBuildingById = getBuildingById;
/**
 * GET /building/image/:id
 * get building by id
 */
const getBuildingImageById = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const buildingService = new building_service_1.BuildingService();
        const imagePath = yield buildingService.getBuildingImageById(req.params.id);
        res.download(imagePath);
    }
    catch (e) {
        console.error(e);
        res.status(e[0] || 500).json({ message: e[1] || "failed", data: {}, error: true });
    }
});
exports.getBuildingImageById = getBuildingImageById;
/**
 * POST /building
 * save building info.
 */
const postBuilding = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const buildingService = new building_service_1.BuildingService();
        const buildingData = yield buildingService.saveBuilding(req.file.path, req.body);
        res.status(200).json({ message: "success", data: {}, error: false });
    }
    catch (e) {
        console.error(e);
        res.status(e[0] || 500).json({ message: e[1] || "failed", data: {}, error: true });
    }
});
exports.postBuilding = postBuilding;
/**
 * POST /building/image
 * add building image.
 */
const postBuildingImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const buildingService = new building_service_1.BuildingService();
        const buildingData = yield buildingService.addBuildingImage(req.file.path, req.body.id);
        res.status(200).json({ message: "success", data: {}, error: false });
    }
    catch (e) {
        console.error(e);
        res.status(e[0] || 500).json({ message: e[1] || "failed", data: {}, error: true });
    }
});
exports.postBuildingImage = postBuildingImage;
/**
 * PUT /building/module
 * add module to building.
 */
const addModule = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const buildingService = new building_service_1.BuildingService();
        const buildingData = yield buildingService.addModule(req.body);
        res.status(200).json({ message: "success", data: {}, error: false });
    }
    catch (e) {
        console.error(e);
        res.status(e[0] || 500).json({ message: e[1] || "failed", data: {}, error: true });
    }
});
exports.addModule = addModule;
/**
 * UPDATE /building/image
 * save building info.
 */
const updateImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const buildingService = new building_service_1.BuildingService();
        const buildingData = yield buildingService.updateImage(Object.assign({ path: req.file.path }, req.body));
        res.status(200).json({ message: "success", data: {}, error: false });
    }
    catch (e) {
        console.error(e);
        res.status(e[0] || 500).json({ message: e[1] || "failed", data: {}, error: true });
    }
});
exports.updateImage = updateImage;
/**
 * UPDATE /building
 * update building info.
 */
const updateBuilding = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const buildingService = new building_service_1.BuildingService();
        const buildingData = yield buildingService.updateBuilding(req.body);
        res.status(200).json({ message: "success", data: {}, error: false });
    }
    catch (e) {
        console.error(e);
        res.status(e[0] || 500).json({ message: e[1] || "failed", data: {}, error: true });
    }
});
exports.updateBuilding = updateBuilding;
//# sourceMappingURL=building.controller.js.map