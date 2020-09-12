export default (sequelize, DataTypes) => {

    const CursoDisciplinaModel = sequelize.define("CursoDisciplinaModel", {
        cdi_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cdi_cur_id: DataTypes.INTEGER,
        cdi_dis_id: DataTypes.INTEGER,
    },{
        tableName: 'curso_disciplina',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });

    CursoDisciplinaModel.associate = function(models) {
        CursoDisciplinaModel.hasMany(models.CursoModel,  { as: 'curso', foreignKey: 'cur_id'})
        CursoDisciplinaModel.hasMany(models.DisciplinaModel,  { as: 'disciplina', foreignKey: 'dis_id'})
    }

    return CursoDisciplinaModel;
}