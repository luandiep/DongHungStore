const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subcategory', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'category',
        key: 'id_category'
      }
    },
    id_subcategory: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'category',
        key: 'id_category'
      }
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'subcategory',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "id_category_idx",
        using: "BTREE",
        fields: [
          { name: "id_category" },
        ]
      },
      {
        name: "id_subcategory_idx",
        using: "BTREE",
        fields: [
          { name: "id_subcategory" },
        ]
      },
    ]
  });
};
