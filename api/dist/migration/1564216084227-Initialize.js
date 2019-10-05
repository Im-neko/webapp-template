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
class Initialize1564216084227 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("CREATE TABLE `building` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `title` varchar(255) NOT NULL, `path_name` varchar(255) NOT NULL, `hash` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `building_image` (`id` int NOT NULL AUTO_INCREMENT, `building_id` int NOT NULL, `path` varchar(255) NOT NULL, INDEX `IDX_01fe85db70d71935ecbcb09da1` (`building_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `building_module` (`building_id` int NOT NULL, `module_id` int NOT NULL, INDEX `IDX_66a832442b718e8a3244947bfb` (`building_id`), PRIMARY KEY (`building_id`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `module` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `button_text` varchar(255) NOT NULL, `module_type` int NOT NULL, `shop_url` varchar(255) NOT NULL, `hash` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `module_image` (`id` int NOT NULL AUTO_INCREMENT, `module_id` int NOT NULL, `path` varchar(255) NOT NULL, INDEX `IDX_284816b3bfcabead0d64a78b08` (`module_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `first_name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `user_auth` (`email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `user_id` int NOT NULL, INDEX `IDX_caf2937301e1200d142227a9be` (`email`), PRIMARY KEY (`email`)) ENGINE=InnoDB");
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("DROP INDEX `IDX_caf2937301e1200d142227a9be` ON `user_auth`");
            yield queryRunner.query("DROP TABLE `user_auth`");
            yield queryRunner.query("DROP TABLE `user`");
            yield queryRunner.query("DROP INDEX `IDX_284816b3bfcabead0d64a78b08` ON `module_image`");
            yield queryRunner.query("DROP TABLE `module_image`");
            yield queryRunner.query("DROP TABLE `module`");
            yield queryRunner.query("DROP INDEX `IDX_66a832442b718e8a3244947bfb` ON `building_module`");
            yield queryRunner.query("DROP TABLE `building_module`");
            yield queryRunner.query("DROP INDEX `IDX_01fe85db70d71935ecbcb09da1` ON `building_image`");
            yield queryRunner.query("DROP TABLE `building_image`");
            yield queryRunner.query("DROP TABLE `building`");
        });
    }
}
exports.Initialize1564216084227 = Initialize1564216084227;
//# sourceMappingURL=1564216084227-Initialize.js.map