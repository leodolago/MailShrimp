import Sequelize, {Optional, Model, ModelAttributes} from 'sequelize';
import database from 'ms-commons/data/db';
import {IContact} from './contact';

interface IContactCreationAttributes extends Optional<IContact, "id">{}

export interface IContactModel extends Model<IContact, IContactCreationAttributes>, IContact {}

const Contact = database.define<IContactModel>('contact', {
   id: {
       type: Sequelize.INTEGER.UNSIGNED,
       primaryKey: true,
       allowNull: false,
       autoIncrement: true
   },
   accountId: {
       type: Sequelize.INTEGER.UNSIGNED,
       allowNull: false
   },
   name: {
       type: Sequelize.STRING(150),
       allowNull: true
   },
   email: {
       type: Sequelize.STRING(150),
       allowNull: false
   },
   phone: {
       type: Sequelize.STRING(11),
       allowNull: true
   },
   status: {
       type: Sequelize.SMALLINT.UNSIGNED,
       allowNull: false,
       defaultValue: 100
   }
}, {
    indexes: [{
        unique: true,
        fields: ['accountId','email']
    }]
})

export default Contact;