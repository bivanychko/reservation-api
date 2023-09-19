import { DataSource } from "typeorm";

const TABLES_TO_SKIP = "'migrations', 'data_migrations', 'node_data_migrations'";

const TABLES_TO_TRUNCATE = `select relname FROM pg_class WHERE relkind = 'r' AND relnamespace = 'public'::regnamespace AND relname NOT IN (${TABLES_TO_SKIP})`;

/**
 * Clears database
 *
 * @param {DataSource} ds - Pre-defined connection configuration to a specific database
 */
export const clearDatabase = async (ds: DataSource): Promise<void> => {
  const result = await ds.query<Array<{ relname: string }>>(TABLES_TO_TRUNCATE);

  await ds.query(`
  DO
  $do$
    BEGIN
    SET session_replication_role TO replica;
    SET CONSTRAINTS ALL DEFERRED;
    ${result.map<string>(r => `DELETE FROM ${r.relname};`).join("\r\n")}
    SET session_replication_role TO default;
    END
  $do$;
  `);
};

/**
 * Disconnect and clear database
 *
 * @param {DataSource} ds - Pre-defined connection configuration to a specific database
 */
export const disconnectAndClearDatabase = async (ds: DataSource): Promise<void> => {
  await clearDatabase(ds);
  await ds.destroy();
};
