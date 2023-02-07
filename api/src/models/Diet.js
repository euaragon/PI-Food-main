const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diet', {
    id: {
      type: DataTypes.UUID, // es un identificador universal que nos ayuda a que no se pisen los id con los de la API
      defaultValue: DataTypes.UUIDV4, // es la version 4 randomizable
      allowNull: false,
      primaryKey: true,
    },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },{timestamps: false})
}