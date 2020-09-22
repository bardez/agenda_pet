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
        age_data: DataTypes.STRING(5),
        age_obs: DataTypes.STRING(100),
    },{
        tableName: 'agendamento',
        timestamps: false,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    AgendamentoModel.associate = function(models) {
        AgendamentoModel.belongsTo(models.AgendamentoServicoModel,  { as: 'agendamento_servico', foreignKey: 'ags_age_id'})
        AgendamentoModel.hasMany(models.UsuarioModel,  { as: 'usuario', foreignKey: 'usu_id'})
        AgendamentoModel.hasMany(models.PetModel,  { as: 'pet', foreignKey: 'pet_id'})
    }

    return AgendamentoModel;
}