import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1564493689095 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `first_name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_auth` (`email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `user_id` int NOT NULL, INDEX `IDX_caf2937301e1200d142227a9be` (`email`), PRIMARY KEY (`email`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_caf2937301e1200d142227a9be` ON `user_auth`");
        await queryRunner.query("DROP TABLE `user_auth`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
