export default (sequelize, DataTypes) => {

    const BibliotecaModel = sequelize.define("BibliotecaModel", {
        bib_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        bib_descricao: DataTypes.STRING(45),
        bib_virtual: DataTypes.BOOLEAN
    },{
        tableName: 'biblioteca',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });

    BibliotecaModel.associate = function(models) {
        BibliotecaModel.hasMany(models.LotsModel,  { as: 'lots', foreignKey: 'auction_id'})
        BibliotecaModel.belongsTo(models.TypesModel,  { as: 'type', foreignKey: 'type_id'})
    }

    return BibliotecaModel;
}