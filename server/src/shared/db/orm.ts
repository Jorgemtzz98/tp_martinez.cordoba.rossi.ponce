import { MikroORM } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { MySqlDriver } from '@mikro-orm/mysql';

export const orm = await MikroORM.init({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: 'sanatorio',
    driver: MySqlDriver,
    clientUrl: 'mysql://root:root@localhost:3306/sanatorio', //mysql://username:password@URL/nameDB
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

