const dbConfig = {
  HOST: "localhost",
  USER: process.env.db_user,
  PASSWORD: process.env.db_password,
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
