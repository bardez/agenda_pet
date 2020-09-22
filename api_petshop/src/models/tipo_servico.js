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
        timestamps: false,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    TipoServicoModel.associate = function(models) {
        TipoServicoModel.belongsTo(models.ServicoModel,  { as: 'servico', foreignKey: 'ser_tip_id'})
        TipoServicoModel.hasMany(models.ConfiguracaoModel,  { as: 'configuracao', foreignKey: 'cfg_id'})
    }

    return TipoServicoModel;
}