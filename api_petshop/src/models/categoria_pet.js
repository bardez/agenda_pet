export default (sequelize, DataTypes) => {
    const CategoriaPetModel = sequelize.define("CategoriaPetModel", {
        cap_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cap_desc: DataTypes.STRING(45)
    },{
        tableName: 'categoria_pet',
        timestamps: false,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        
    });

    CategoriaPetModel.associate = function(models) {
        CategoriaPetModel.belongsTo(models.PetModel,  { as: 'pet', foreignKey: 'pet_cat_id'})
    }
    
    return CategoriaPetModel;
}