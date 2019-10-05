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
class Initialize1564149256155 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("CREATE TABLE `module` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `module_type` int NOT NULL, `shop_url` varchar(255) NOT NULL, `hash` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `module_image` (`id` int NOT NULL AUTO_INCREMENT, `module_id` int NOT NULL, `path` varchar(255) NOT NULL, INDEX `IDX_284816b3bfcabead0d64a78b08` (`module_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
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
        });
    }
}
exports.Initialize1564149256155 = Initialize1564149256155;
//# sourceMappingURL=1564149256155-Initialize.js.map