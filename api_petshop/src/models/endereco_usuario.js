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
        EnderecoUsuarioModel.hasMany(models.UsuarioModel,  { as: 'usuario', foreignKey: 'usu_id'})
        EnderecoUsuarioModel.hasMany(models.EnderecoModel,  { as: 'endereco', foreignKey: 'end_id'})
    }

    return EnderecoUsuarioModel;
}