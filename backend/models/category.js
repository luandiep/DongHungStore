const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('category', {
    Id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    ParentId: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Code: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    Grade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Inactive: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    SortOrder: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
