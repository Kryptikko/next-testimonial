import { Sequelize } from 'sequelize';

const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST
} = process.env;

// @ts-ignore
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'postgres'
});

const getConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
  return sequelize
}


export default getConnection();
