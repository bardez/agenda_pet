export default (sequelize, DataTypes) => {
    const UsuarioModel = sequelize.define("UsuarioModel", {
        usu_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        usu_nome: DataTypes.STRING(50),
        usu_tip_id: DataTypes.INTEGER,
        usu_email: {
            type: DataTypes.STRING(100),
            isEmail: true,
            unique: true
        },
        usu_status: DataTypes.INTEGER(1),
        usu_celular: DataTypes.STRING(14),
        usu_cpf_cnpj: DataTypes.STRING(18),
        usu_senha: DataTypes.STRING(30)
    },{
        tableName: 'usuario',
        timestamps: false,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        
    });

    UsuarioModel.associate = function(models) {
        UsuarioModel.hasOne(models.TipoUsuarioModel,  { as: 'tipo_usuario', foreignKey: 'tip_id'})
    }
    
    return UsuarioModel;
}