import { DataTypes } from 'sequelize';
import { Table, Column, Model } from 'sequelize-typescript';

@Table({
    indexes: [{ unique: true, fields: ['user_name']}],
    timestamps: false,
    hooks: {
        beforeUpdate: (record) => {
            record.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        }
    }
})
export class Author extends Model {
    @Column({
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'pk_author_id'
    })
    authorID: number;

    @Column({
        type: DataTypes.STRING(30),
        allowNull: false,
        field: 'first_name'
    })
    firstName: string;

    @Column({
        type: DataTypes.STRING(30),
        allowNull: false,
        field: 'last_name'
    })
    lastName: string;

    @Column({
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        field: 'user_name'
    })
    userName: string;

    @Column({
        type: DataTypes.CHAR(95),
        allowNull: false
    })
    password: string;

    @Column({
        type: DataTypes.CHAR(32),
        allowNull: false
    })
    salt: string;

    @Column({
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
        get() {
            return new Date(this.getDataValue('createdAt'));
        }
    })
    createdAt: Date;

    @Column({
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updated_at',
        get() {
            return new Date(this.getDataValue('updatedAt'));
        }
    })
    updatedAt: Date;
};