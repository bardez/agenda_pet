export default (sequelize, DataTypes) => {

    const PetModel = sequelize.define("PetModel", {
        pet_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pet_cat_id: DataTypes.INTEGER,
        pet_usu_id: DataTypes.INTEGER,
        pet_nome: DataTypes.STRING(45),
        pet_nascimento: DataTypes.DATEONLY,
        pet_raca: DataTypes.STRING(45),
        pet_obs: DataTypes.STRING(10)
    },{
        tableName: 'pet',
        timestamps: false,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    PetModel.associate = function(models) {
        PetModel.belongsTo(models.CategoriaPetModel,  { as: 'categoria_pet', foreignKey: 'pet_cat_id'})
        PetModel.belongsTo(models.UsuarioModel,  { as: 'usuario', foreignKey: 'pet_usu_id'})
    }

    return PetModel;
}