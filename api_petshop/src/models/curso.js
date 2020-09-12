export default (sequelize, DataTypes) => {

    const CursoModel = sequelize.define("CursoModel", {
        cur_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cur_descricao: DataTypes.STRING(45)
    },{
        tableName: 'curso',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });

    CursoModel.associate = function(models) {
        CursoModel.belongsTo(models.CursoDisciplinaModel,  { as: 'curso_disciplina', foreignKey: 'cdi_cur_id'})
    }

    return CursoModel;
}