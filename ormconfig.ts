// import { DataSource, DataSourceOptions  } from "typeorm";
// const config = require('typeorm');
const {DataSource, DataSourceOptions} = require('typeorm');
// const DataSource = new config.DataSource();


// export const AppDataSource = new DataSource({
  // const config: DataSourceOptions =({
  const config = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "postgres",
  // url: "postgres://postgres:1234@localhost:5432/postgres",
  synchronize: true,
  logging: true,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
  // cli: {
  //   migrationsDir: "src/migrations",
  //   entitiesDir: ["./src/**/*.entity{.ts,.js}"],
  // }
  };

module.exports = config;
// export default config;
// module.exports = AppDataSource;