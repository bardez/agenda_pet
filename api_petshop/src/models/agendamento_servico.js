export default (sequelize, DataTypes) => {

    const AgendamentoServicoModel = sequelize.define("AgendamentoServicoModel", {
        ags_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ags_age_id: DataTypes.INTEGER,
        ags_ser_id: DataTypes.INTEGER,
        ags_status: DataTypes.INTEGER,
    },{
        tableName: 'agendamento_servico',
        timestamps: false,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    AgendamentoServicoModel.associate = function(models) {
        AgendamentoServicoModel.hasMany(models.ServicoModel,  { as: 'servico', foreignKey: 'ser_id'})
        AgendamentoServicoModel.hasMany(models.AgendamentoModel,  { as: 'agendamento', foreignKey: 'age_id'})
    }

    return AgendamentoServicoModel;
}