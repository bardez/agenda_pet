export default (sequelize, DataTypes) => {

    const AutorModel = sequelize.define("AutorModel", {
        aut_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        aut_nome: DataTypes.STRING(45)
    },{
        tableName: 'autor',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });

    AutorModel.associate = function(models) {
        AutorModel.belongsTo(models.ObraAutorMOdel,  { as: 'obra_autor', foreignKey: 'oat_aut_id'})
    }

    return AutorModel;
}