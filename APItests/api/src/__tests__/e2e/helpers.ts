export async function clearDB(connection) {
    const entities = connection.entityMetadatas;
    for (const entity of entities) {
      const repository = await connection.getRepository(entity.name);
      await repository.query(`DROP TABLE "${entity.tableName}" CASCADE;`);
    }
  }
  