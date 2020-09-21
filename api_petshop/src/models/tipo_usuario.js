export default (sequelize, DataTypes) => {

    const TipoUsuarioModel = sequelize.define("TipoUsuarioModel", {
        tip_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tip_desc: DataTypes.STRING(45)
    },{
        tableName: 'tipo_usuario',
        timestamps: false,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });

    TipoUsuarioModel.associate = function(models) {
        TipoUsuarioModel.belongsTo(models.UsuarioModel,  { as: 'usuario', foreignKey: 'usu_id'})
    }

    return TipoUsuarioModel;
}