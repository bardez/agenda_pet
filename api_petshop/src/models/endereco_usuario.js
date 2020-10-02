export default (sequelize, DataTypes) => {

    const EnderecoUsuarioModel = sequelize.define("EnderecoUsuarioModel", {
        enu_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        enu_end_id: DataTypes.INTEGER,
        enu_usu_id: DataTypes.INTEGER
    },{
        tableName: 'endereco_usuario',
        timestamps: false,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    EnderecoUsuarioModel.associate = function(models) {
        EnderecoUsuarioModel.belongsToMany(models.UsuarioModel,  { as: 'usuario', foreignKey: 'enu_usu_id', through: 'endereco_usuario_task'})
        EnderecoUsuarioModel.belongsToMany(models.EnderecoModel,  { as: 'endereco', foreignKey: 'enu_end_id', through: 'endereco_usuario_task'})
    }

    return EnderecoUsuarioModel;
}