import Sequelize, { Model, Optional } from 'sequelize';
import database from '../db';
import {IAccount} from './account';

interface AccountCreationAttributes extends Optional<IAccount, 'id'>{}

export interface IAccountModel extends Model<IAccount, AccountCreationAttributes>, IAccount {}

export default database.define<IAccountModel>('account', {
    id: { 
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false 
    },
    name: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    status: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 100
    },
    domain: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
});