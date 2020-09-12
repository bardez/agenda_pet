export default (sequelize, DataTypes) => {
    const ConfigModel = sequelize.define("ConfigModel", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        key: DataTypes.STRING(50),
        value: DataTypes.STRING(100),
        app: DataTypes.ENUM('SITE', 'ADMIN'),
        type: DataTypes.ENUM('TEXT', 'FILE')
    },{
        tableName: 'configuration',
        timestamps: false,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        
    });
    
    return ConfigModel;
}