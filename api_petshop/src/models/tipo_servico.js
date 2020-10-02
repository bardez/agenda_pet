export default (sequelize, DataTypes) => {

    const TipoServicoModel = sequelize.define("TipoServicoModel", {
        tis_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tis_cfg_id: DataTypes.INTEGER,
        tis_desc: DataTypes.STRING(45)
    },{
        tableName: 'tipo_servico',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });

    TipoServicoModel.associate = function(models) {
        TipoServicoModel.belongsTo(models.ConfiguracaoModel,  { as: 'configuracao', foreignKey: 'tis_cfg_id'})
    }

    return TipoServicoModel;
}