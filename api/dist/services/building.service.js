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
const Building_entity_1 = require("../entities/Building.entity");
const BuildingImage_entity_1 = require("../entities/BuildingImage.entity");
const BuildingModule_entity_1 = require("../entities/BuildingModule.entity");
const module_service_1 = require("./module.service");
const env_1 = require("../config/env");
class BuildingService {
    getBuildings() {
        return __awaiter(this, void 0, void 0, function* () {
            const buildingEntites = yield Building_entity_1.Building.find();
            if (!buildingEntites.length) {
                throw [404, "building not found"];
            }
            return buildingEntites;
        });
    }
    getBuildingById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const buildingData = yield Building_entity_1.Building.findOne({ where: { id } });
            if (!buildingData) {
                throw [404, "building not found"];
            }
            const imageEntites = yield BuildingImage_entity_1.BuildingImage.find({ where: { building_id: id }, take: 4 });
            if (!imageEntites.length) {
                return buildingData;
            }
            const images = [];
            imageEntites.map(image => {
                images.push(`${env_1.apiUrl}/building/image/${image.id}`);
            });
            const buildingModuleIds = yield BuildingModule_entity_1.BuildingModule.find({ where: { building_id: id }, take: 10 });
            const modules = [];
            const moduleService = new module_service_1.ModuleService();
            yield Promise.all(buildingModuleIds.map((_) => __awaiter(this, void 0, void 0, function* () {
                const moduleEntity = yield moduleService.getModuleById(_.module_id);
                console.log("moduleEntity", moduleEntity);
                modules.push(moduleEntity);
            })));
            buildingData.images = images;
            buildingData.modules = modules;
            return buildingData;
        });
    }
    getBuildingImageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield BuildingImage_entity_1.BuildingImage.findOne({ where: { id } });
            if (!image) {
                throw [404, "image not found"];
            }
            return image.path;
        });
    }
    saveBuilding(imagePath, buildingInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const sha512 = crypto_1.createHash("sha512");
            sha512.update(JSON.stringify(buildingInfo));
            const hash = sha512.digest("hex");
            const existBuilding = yield Building_entity_1.Building.findOne({ where: { hash } });
            if (existBuilding) {
                throw [400, "same data building already exist."];
            }
            yield typeorm_1.getManager().transaction((session) => __awaiter(this, void 0, void 0, function* () {
                const buildingData = new Building_entity_1.Building();
                buildingData.name = buildingInfo.name;
                buildingData.title = buildingInfo.title;
                buildingData.hash = hash;
                const savedBuilding = yield session.save(buildingData);
                const building_id = savedBuilding.id;
                const buildingImage = new BuildingImage_entity_1.BuildingImage();
                buildingImage.building_id = building_id;
                buildingImage.path = imagePath;
                yield session.save(buildingImage);
            }));
            return true;
        });
    }
    addBuildingImage(imagePath, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existCheck = yield Building_entity_1.Building.findOne({ where: { id } });
            if (!existCheck) {
                throw [400, "building not found"];
            }
            const buildingImage = new BuildingImage_entity_1.BuildingImage();
            buildingImage.building_id = id;
            buildingImage.path = imagePath;
            yield buildingImage.save();
            return true;
        });
    }
    addModule(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const building_id = data.building_id;
            yield Promise.all(yield data.module_id_list.map((module_id) => __awaiter(this, void 0, void 0, function* () {
                const existCheck = yield BuildingModule_entity_1.BuildingModule.findOne({ where: { building_id, module_id } });
                if (existCheck) {
                    return;
                }
                const insertData = new BuildingModule_entity_1.BuildingModule();
                insertData.building_id = building_id;
                insertData.module_id = module_id;
                const savedBuilding = yield insertData.save();
                return;
            })));
            return true;
        });
    }
    updateImage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existCheck = yield BuildingImage_entity_1.BuildingImage.findOne({ where: { id: data.id } });
            if (!existCheck) {
                throw [400, "the id building doesn't exist"];
            }
            const id = data.id;
            delete data.id;
            yield typeorm_1.getManager()
                .createQueryBuilder()
                .update(BuildingImage_entity_1.BuildingImage)
                .set({ data })
                .where("id = :id", { id });
            return true;
        });
    }
    updateBuilding(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existCheck = yield Building_entity_1.Building.findOne({ where: { id: data.id } });
            if (!existCheck) {
                throw [400, "the id building doesn't exist"];
            }
            const id = data.id;
            delete data.id;
            const res = yield typeorm_1.getManager()
                .createQueryBuilder()
                .update(Building_entity_1.Building)
                .set({ data })
                .where("id = :id", { id });
            console.log(res);
            return true;
        });
    }
    getLatestImageId() {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield BuildingImage_entity_1.BuildingImage.find({
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
exports.BuildingService = BuildingService;
//# sourceMappingURL=building.service.js.map