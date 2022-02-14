const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "product",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      Code: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Id_Category: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
          model: "category",
          key: "Id",
        },
      },
      Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Price: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      Content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Image_link: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      Image_list: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      View: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Unit_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "unit",
          key: "Id",
        },
      },
    },
    {
      sequelize,
      tableName: "product",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "Id" }],
        },
        {
          name: "Id_Category_idx",
          using: "BTREE",
          fields: [{ name: "Id_Category" }],
        },
        {
          name: "Unit_id_idx",
          using: "BTREE",
          fields: [{ name: "Unit_Id" }],
        },
      ],
    }
  );
};
