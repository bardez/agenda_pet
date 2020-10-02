export default (sequelize, DataTypes) => {

    const AgendamentoModel = sequelize.define("AgendamentoModel", {
        age_id: {
            type: DataTypes.INTEGER,
            ageoIncrement: true,
            primaryKey: true
        },
        age_usu_id: DataTypes.INTEGER,
        age_pet_id: DataTypes.INTEGER,
        age_data: DataTypes.DATEONLY,
        age_hora: DataTypes.TIME,
        age_obs: DataTypes.STRING(100),
    },{
        tableName: 'agendamento',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });

    AgendamentoModel.associate = function(models) {
        AgendamentoModel.belongsTo(models.UsuarioModel,  { as: 'usuario', foreignKey: 'age_usu_id'})
        AgendamentoModel.belongsTo(models.PetModel,  { as: 'pet', foreignKey: 'age_pet_id'})
    }

    return AgendamentoModel;
}