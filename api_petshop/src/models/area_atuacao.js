export default (sequelize, DataTypes) => {

    const AreaAtuacaoModel = sequelize.define("AreaAtuacaoModel", {
        are_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        are_descricao: DataTypes.STRING(45)
    },{
        tableName: 'area_atuacao',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });

    AreaAtuacaoModel.associate = function(models) {
        AreaAtuacaoModel.belongsTo(models.ObraAreaAtuacaoMOdel,  { as: 'obra_autor', foreignKey: 'oat_aut_id'})
    }

    return AreaAtuacaoModel;
}