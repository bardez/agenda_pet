export default (sequelize, DataTypes) => {
    const FuncionalidadeModel = sequelize.define("FuncionalidadeModel", {
        fun_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fun_arquivo: DataTypes.STRING(45),
        fun_descricao: DataTypes.STRING(45)
    },{
        tableName: 'disciplina',
        timestamps: false,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        
    });

    FuncionalidadeModel.associate = function(models) {
        FuncionalidadeModel.hasMany(models.AreaModel,  { as: 'area', foreignKey: 'are_id'})
        FuncionalidadeModel.belongsTo(models.CursoFuncionalidadeModel,  { as: 'curso_disciplina', foreignKey: 'cdi_dis_id'})
    }
    
    return FuncionalidadeModel;
}