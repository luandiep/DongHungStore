var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _posts = require("./posts");
var _product = require("./product");
var _subcategory = require("./subcategory");
var _unit = require("./unit");
var _users = require("./users");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var subcategory = _subcategory(sequelize, DataTypes);
  var unit = _unit(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  product.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(product, { as: "products", foreignKey: "category_id"});
  subcategory.belongsTo(category, { as: "id_category_category", foreignKey: "id_category"});
  category.hasMany(subcategory, { as: "subcategories", foreignKey: "id_category"});
  subcategory.belongsTo(category, { as: "id_subcategory_category", foreignKey: "id_subcategory"});
  category.hasMany(subcategory, { as: "id_subcategory_subcategories", foreignKey: "id_subcategory"});
  product.belongsTo(unit, { as: "unit", foreignKey: "unit_id"});
  unit.hasMany(product, { as: "products", foreignKey: "unit_id"});

  return {
    category,
    posts,
    product,
    subcategory,
    unit,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
