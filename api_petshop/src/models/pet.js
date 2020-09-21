export default (sequelize, DataTypes) => {

    const PetModel = sequelize.define("PetModel", {
        pet_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pet_cat_id: DataTypes.INTEGER,
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
        deletedAt: 'deleted_at',
    });

    PetModel.associate = function(models) {
        PetModel.hasMany(models.CategoriaPetModel,  { as: 'categoria_pet', foreignKey: 'cap_id'})
    }

    return PetModel;
}