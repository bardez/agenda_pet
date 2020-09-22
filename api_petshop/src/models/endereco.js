export default (sequelize, DataTypes) => {
    const EnderecoModel = sequelize.define("EnderecoModel", {
        end_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        end_logradouro: DataTypes.STRING(50),
        end_numero: DataTypes.STRING(10),
        end_bairro: DataTypes.STRING(30),
        end_complemento: DataTypes.STRING(30),
        end_cidade: DataTypes.STRING(40),
        end_estado: DataTypes.STRING(2),
    },{
        tableName: 'endereco',
        timestamps: false,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        
    });

    EnderecoModel.associate = function(models) {
        EnderecoModel.belongsTo(models.EnderecoUsuarioModel,  { as: 'endereco_usuario', foreignKey: 'enu_end_id'})
    }
    
    return EnderecoModel;
}