import { SESSION_STATUS } from "../utils/constants";

export default (sequelize, DataTypes) => {
    const SessionModel = sequelize.define("SessionModel", {
        id: {
            type: DataTypes.INTEGER(),
            autoIncrement: true,
            primaryKey: true
        },
        user_id: DataTypes.INTEGER(),
        ip: DataTypes.STRING(16),
        status: DataTypes.ENUM(SESSION_STATUS.ACTIVE, SESSION_STATUS.INACTIVE),
    },{
        tableName: 'session',
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    
    return SessionModel;
}