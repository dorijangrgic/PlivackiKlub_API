const dbConfig = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "projektRis2020",
  DB: "plivackiKlub",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export { dbConfig };
