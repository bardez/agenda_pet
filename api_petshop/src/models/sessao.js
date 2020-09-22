import { SESSION_STATUS } from "../utils/constants";

export default (sequelize, DataTypes) => {
    const SessaoModel = sequelize.define("SessaoModel", {
        ses_id: {
            type: DataTypes.INTEGER(),
            autoIncrement: true,
            primaryKey: true
        },
        ses_usu_id: DataTypes.INTEGER(),
        ses_ip: DataTypes.STRING(16),
        ses_status: DataTypes.ENUM(SESSION_STATUS.ACTIVE, SESSION_STATUS.INACTIVE),
    },{
        tableName: 'sessao',
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    
    return SessaoModel;
}