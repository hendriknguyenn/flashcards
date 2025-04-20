export default {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: 'HendrikPost1!',
    DB: 'flashcard_database',
    dialect: 'postgres',
    PORT: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };