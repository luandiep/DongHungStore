var mapper = require("js-model-mapper");
const parse = mapper(["id_category", "id_subcategory", "name", "description"]);
exports.parse = parse;
