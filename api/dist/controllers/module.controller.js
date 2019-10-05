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
const module_service_1 = require("../services/module.service");
/**
 * GET /module
 * get modules
 */
const getModules = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const moduleService = new module_service_1.ModuleService();
        const moduleEntites = yield moduleService.getModules();
        console.log(moduleEntites);
        res.status(200).json({ message: "success", data: moduleEntites, error: false });
    }
    catch (e) {
        console.error(e);
        res.status(e[0] || 500).json({ message: e[1] || "failed", data: {}, error: true });
    }
});
exports.getModules = getModules;
/**
 * GET /module/:id
 * get module by id
 */
const getModuleById = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const moduleService = new module_service_1.ModuleService();
        const moduleData = yield moduleService.getModuleById(req.params.id);
        res.status(200).json({ message: "success", data: moduleData, error: false });
    }
    catch (e) {
        console.error(e);
        res.status(e[0] || 500).json({ message: e[1] || "failed", data: {}, error: true });
    }
});
exports.getModuleById = getModuleById;
/**
 * GET /module/image/:id
 * get module by id
 */
const getModuleImageById = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const moduleService = new module_service_1.ModuleService();
        const imagePath = yield moduleService.getModuleImageById(req.params.id);
        res.download(imagePath);
    }
    catch (e) {
        console.error(e);
        res.status(e[0] || 500).json({ message: e[1] || "failed", data: {}, error: true });
    }
});
exports.getModuleImageById = getModuleImageById;
/**
 * POST /module
 * save module info.
 */
const postModule = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const moduleService = new module_service_1.ModuleService();
        const moduleData = yield moduleService.saveModule(req.file.path, req.body);
        res.status(200).json({ message: "success", data: {}, error: false });
    }
    catch (e) {
        console.error(e);
        res.status(e[0] || 500).json({ message: e[1] || "failed", data: {}, error: true });
    }
});
exports.postModule = postModule;
/**
 * POST /module/image
 * add module image.
 */
const postModuleImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const moduleService = new module_service_1.ModuleService();
        const moduleData = yield moduleService.addModuleImage(req.file.path, req.body.id);
        res.status(200).json({ message: "success", data: {}, error: false });
    }
    catch (e) {
        console.error(e);
        res.status(e[0] || 500).json({ message: e[1] || "failed", data: {}, error: true });
    }
});
exports.postModuleImage = postModuleImage;
//# sourceMappingURL=module.controller.js.map