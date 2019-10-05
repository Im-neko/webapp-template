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
const typeorm_1 = require("typeorm");
const crypto_1 = require("crypto");
const Module_entity_1 = require("../entities/Module.entity");
const ModuleImage_entity_1 = require("../entities/ModuleImage.entity");
const env_1 = require("../config/env");
class ModuleService {
    getModules() {
        return __awaiter(this, void 0, void 0, function* () {
            const moduleEntites = yield Module_entity_1.Module.find();
            if (!moduleEntites.length) {
                throw [404, "module not found"];
            }
            return moduleEntites;
        });
    }
    getModuleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const moduleData = yield Module_entity_1.Module.findOne({ where: { id } });
            if (!moduleData) {
                throw [404, "module not found"];
            }
            const imageEntites = yield ModuleImage_entity_1.ModuleImage.find({ where: { module_id: id }, take: 4 });
            if (!imageEntites.length) {
                return moduleData;
            }
            const images = [];
            imageEntites.map(image => {
                images.push(`${env_1.apiUrl}/module/image/${image.id}`);
            });
            moduleData.images = images;
            return moduleData;
        });
    }
    getModuleImageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield ModuleImage_entity_1.ModuleImage.findOne({ where: { id } });
            if (!image) {
                throw [404, "image not found"];
            }
            return image.path;
        });
    }
    saveModule(imagePath, moduleInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const sha512 = crypto_1.createHash("sha512");
            sha512.update(JSON.stringify(moduleInfo));
            const hash = sha512.digest("hex");
            const existModule = yield Module_entity_1.Module.findOne({ where: { hash } });
            if (existModule) {
                throw [400, "same data module already exist."];
            }
            yield typeorm_1.getManager().transaction((session) => __awaiter(this, void 0, void 0, function* () {
                const moduleData = new Module_entity_1.Module();
                moduleData.title = moduleInfo.title;
                moduleData.text = moduleInfo.text;
                moduleData.button_text = moduleInfo.button_text;
                moduleData.module_type = moduleInfo.module_type;
                moduleData.shop_url = moduleInfo.shop_url;
                moduleData.hash = hash;
                const savedModule = yield session.save(moduleData);
                const module_id = savedModule.id;
                const moduleImage = new ModuleImage_entity_1.ModuleImage();
                moduleImage.module_id = module_id;
                moduleImage.path = imagePath;
                yield session.save(moduleImage);
            }));
            return true;
        });
    }
    addModuleImage(imagePath, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existCheck = yield Module_entity_1.Module.findOne({ where: { id } });
            if (!existCheck) {
                throw [400, "module not found"];
            }
            const moduleImage = new ModuleImage_entity_1.ModuleImage();
            moduleImage.module_id = id;
            moduleImage.path = imagePath;
            yield moduleImage.save();
            return true;
        });
    }
    updateModule(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existCheck = yield Module_entity_1.Module.findOne({ where: { id: data.id } });
            if (!existCheck) {
                throw [400, "the id building doesn't exist"];
            }
            const id = data.id;
            delete data.id;
            yield typeorm_1.getManager()
                .createQueryBuilder()
                .update(Module_entity_1.Module)
                .set({ data })
                .where("id = :id", { id });
            return true;
        });
    }
    getLatestImageId() {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield ModuleImage_entity_1.ModuleImage.find({
                order: {
                    id: "DESC"
                },
                skip: 0,
                take: 1
            });
            if (!image.length) {
                return 0;
            }
            return image[0].id;
        });
    }
}
exports.ModuleService = ModuleService;
//# sourceMappingURL=module.service.js.map