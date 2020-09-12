export default (sequelize, DataTypes) => {

    const ObraAutorModel = sequelize.define("ObraAutorModel", {
        oat_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        oat_obr_id: DataTypes.INTEGER,
        oat_aut_id: DataTypes.INTEGER
    },{
        tableName: 'obra_autor',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });

    ObraAutorModel.associate = function(models) {
        ObraAutorModel.hasMany(models.AutorModel,  { as: 'autor', foreignKey: 'aut_id'})
        ObraAutorModel.hasMany(models.ObraModel,  { as: 'obra', foreignKey: 'obr_id'})
    }

    return ObraAutorModel;
}