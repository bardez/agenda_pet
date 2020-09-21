export default (sequelize, DataTypes) => {

    const UsuarioPetModel = sequelize.define("UsuarioPetModel", {
        usp_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        usp_usu_id: DataTypes.INTEGER,
        usp_pet_id: DataTypes.INTEGER
    },{
        tableName: 'usuario_pet',
        timestamps: false,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });

    UsuarioPetModel.associate = function(models) {
        UsuarioPetModel.hasMany(models.UsuarioModel,  { as: 'usuario', foreignKey: 'usu_id'})
        UsuarioPetModel.hasMany(models.PetModel,  { as: 'pet', foreignKey: 'pet_id'})
    }

    return UsuarioPetModel;
}