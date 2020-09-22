import { SESSION_STATUS } from "../utils/constants";

export default (sequelize, DataTypes) => {
    const ServicoModel = sequelize.define("ServicoModel", {
        ser_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ser_tip_id: DataTypes.INTEGER,
        ser_valor: DataTypes.DECIMAL(5,2),
    },{
        tableName: 'servico',
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    ServicoModel.associate = function(models) {
        ServicoModel.belongsTo(models.AgendamentoServicoModel,  { as: 'agendamento_servico', foreignKey: 'ags_ser_id'})
        ServicoModel.hasMany(models.TipoServicoModel,  { as: 'tipo_servico', foreignKey: 'tip_id'})
    }
    
    return ServicoModel;
}