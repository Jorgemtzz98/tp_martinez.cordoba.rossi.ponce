import { MikroORM } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { MySqlDriver } from '@mikro-orm/mysql';

export const orm = await MikroORM.init({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: 'bxodewa53yqcrcpuj86u',
    driver: MySqlDriver,
    clientUrl: 'mysql://uulllhbxn96dz9d9:ntC1jKnumcyZpHys9Pym@bxodewa53yqcrcpuj86u-mysql.services.clever-cloud.com:3306/bxodewa53yqcrcpuj86u', //mysql://username:password@URL/nameDB
    highlighter: new SqlHighlighter(),
    debug: true,
    schemaGenerator: {
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
        ignoreSchema: [],
    }
})


export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator()
    await generator.updateSchema() 
}

