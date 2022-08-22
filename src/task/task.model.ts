import { DataTypes, Deferrable } from 'sequelize';
import { Table, Column, Model } from 'sequelize-typescript';
import { Author } from '../author/author.model';

@Table({
    timestamps: false,
    hooks: {
        beforeUpdate: (record) => {
            record.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        }
    }
})
export class Task extends Model {
    @Column({
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'pk_task_id'
    })
    taskID: number;

    @Column({
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'fk_author_id',
        references: {
            model: Author,
            key: 'pk_author_id',
            
            deferrable: new Deferrable.INITIALLY_IMMEDIATE
        },
    })
    authorAuthorID: number;

    @Column({
        type: DataTypes.STRING,
        allowNull: false 
    })
    title: string;

    @Column({
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    archived: boolean;

    @Column({
        type: DataTypes.TEXT('medium'),
        allowNull: false,
        defaultValue: '',
        get() {
            return this.getDataValue('categories').split(',');
        },
        set(value: string[] = []) {
            this.setDataValue('categories', value.join(','));
        }
    })
    categories: string[]

    @Column({
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true 
    })
    public: boolean;

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
