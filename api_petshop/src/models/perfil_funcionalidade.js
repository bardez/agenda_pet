export default (sequelize, DataTypes) => {

    const PerfilFuncionalidadeModel = sequelize.define("PerfilFuncionalidadeModel", {
        pfc_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pfc_descricao: DataTypes.STRING(45)
    },{
        tableName: 'perfil_funcionalidade',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });

    PerfilFuncionalidadeModel.associate = function(models) {
        PerfilFuncionalidadeModel.hasMany(models.PerfilModel,  { as: 'perfil', foreignKey: 'per_id'})
        PerfilFuncionalidadeModel.hasMany(models.FuncionalidadeMenuModel,  { as: 'funcionalidade', foreignKey: 'fun_id'})
    }

    return PerfilFuncionalidadeModel;
}