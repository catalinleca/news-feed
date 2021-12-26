import {Sequelize} from "sequelize";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './store.sqlite'
});

export default sequelize;
