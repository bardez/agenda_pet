export default (sequelize, DataTypes) => {
    const DisciplinaModel = sequelize.define("DisciplinaModel", {
        dis_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dis_are_id: DataTypes.INTEGER,
        dis_descricao: DataTypes.STRING(45)
    },{
        tableName: 'disciplina',
        timestamps: false,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        
    });

    DisciplinaModel.associate = function(models) {
        DisciplinaModel.hasMany(models.AreaModel,  { as: 'area', foreignKey: 'are_id'})
        DisciplinaModel.belongsTo(models.CursoDisciplinaModel,  { as: 'curso_disciplina', foreignKey: 'cdi_dis_id'})
    }
    
    return DisciplinaModel;
}