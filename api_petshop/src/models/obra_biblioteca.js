export default (sequelize, DataTypes) => {

    const ObraBibliotecaModel = sequelize.define("ObraBibliotecaModel", {
        obi_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        obi_obr_id: DataTypes.INTEGER,
        obi_bib_id: DataTypes.INTEGER
    },{
        tableName: 'obra_biblioteca',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });

    ObraBibliotecaModel.associate = function(models) {
        ObraBibliotecaModel.hasMany(models.BibliotecaModel,  { as: 'biblioteca', foreignKey: 'bib_id'})
        ObraBibliotecaModel.hasMany(models.ObraModel,  { as: 'obra', foreignKey: 'obr_id'})
    }

    return ObraBibliotecaModel;
}