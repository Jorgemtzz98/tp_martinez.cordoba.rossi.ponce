import { MikroORM } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

export const orm = await MikroORM.init({
    entities: ['server/**/*.entity.js'],
    entitiesTS: ['src/**/*.entity.js'],
    dbName: 'sanatorio',
    type: 'mysql',
    clientUrl: 'mysql://root:root@localhost:3001/sanatorio',
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