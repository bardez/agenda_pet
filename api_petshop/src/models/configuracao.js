export default (sequelize, DataTypes) => {
    const ConfiguracaoModel = sequelize.define("ConfiguracaoModel", {
        cfg_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cfg_status: DataTypes.INTEGER(1),
        cfg_seg: DataTypes.INTEGER(1),
        cfg_ter: DataTypes.INTEGER(1),
        cfg_qua: DataTypes.INTEGER(1),
        cfg_qui: DataTypes.INTEGER(1),
        cfg_sex: DataTypes.INTEGER(1),
        cfg_sab: DataTypes.INTEGER(1),
        cfg_dom: DataTypes.INTEGER(1),
        cfg_duracao_min: DataTypes.INTEGER,
        cfg_hora_ini: DataTypes.TIME,
        cfg_hora_fim: DataTypes.TIME,
        cfg_intervalo_ini: DataTypes.TIME,
        cfg_intervalo_fim: DataTypes.TIME,
    },{
        tableName: 'configuracao',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        
    });

    ConfiguracaoModel.associate = function(models) {
        // ConfiguracaoModel.belongsTo(models.TipoServicoModel,  { as: 'tipo_servico', foreignKey: 'cfg_id'})
    }
    
    return ConfiguracaoModel;
}