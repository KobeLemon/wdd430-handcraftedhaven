"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUserAndArtisan = exports.getArtisanByProduct = exports.getProductsByCategory = exports.getProductsByCollection = exports.getReviewsByProductId = exports.getProductById = exports.getArtisanById = exports.getUserByEmail = void 0;
var postgres_1 = require("@vercel/postgres");
var dotenv_1 = require("dotenv");
var crypto_1 = require("crypto");
(0, dotenv_1.config)();
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function () {
        var user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT * FROM HandcraftedHavenUsers WHERE email=", ""], ["SELECT * FROM HandcraftedHavenUsers WHERE email=", ""])), email)];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user.rows[0]];
                case 2:
                    error_1 = _a.sent();
                    console.error('Failed to fetch user:', error_1);
                    throw new Error('Failed to fetch user.');
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUserByEmail = getUserByEmail;
function getArtisanById(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var artisan, rawObj, picArray, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["SELECT * FROM HandcraftedHavenArtisans WHERE id=", ""], ["SELECT * FROM HandcraftedHavenArtisans WHERE id=", ""])), _id)];
                case 1:
                    artisan = _a.sent();
                    rawObj = artisan.rows[0];
                    picArray = JSON.parse(rawObj.pictures[0].replace("{", "[").replace("}", "]"));
                    rawObj.pictures = { small: picArray[0], medium: picArray[1], big: picArray[2] };
                    return [2 /*return*/, rawObj];
                case 2:
                    error_2 = _a.sent();
                    console.error('Failed to fetch artisan:', error_2);
                    throw new Error('Failed to fetch artisan.');
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getArtisanById = getArtisanById;
function getProductById(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var product, rawObj, picArray, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["SELECT * FROM HandcraftedHavenProducts WHERE id=", ""], ["SELECT * FROM HandcraftedHavenProducts WHERE id=", ""])), _id)];
                case 1:
                    product = _a.sent();
                    rawObj = product.rows[0];
                    picArray = JSON.parse(rawObj.pictures[0].replace("{", "[").replace("}", "]"));
                    rawObj.pictures = { small: picArray[0], medium: picArray[1], big: picArray[2] };
                    return [2 /*return*/, rawObj];
                case 2:
                    error_3 = _a.sent();
                    console.error('Failed to fetch product:', error_3);
                    throw new Error('Failed to fetch product.');
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getProductById = getProductById;
function getReviewsByProductId(productID) {
    return __awaiter(this, void 0, void 0, function () {
        var product, results, processed, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["SELECT * FROM HandcraftedHavenReviews WHERE productId=", ""], ["SELECT * FROM HandcraftedHavenReviews WHERE productId=", ""])), productID)];
                case 1:
                    product = _a.sent();
                    results = product.rows;
                    console.log(results);
                    processed = results.map(function (item) { return item; });
                    console.log(processed);
                    return [2 /*return*/, processed];
                case 2:
                    error_4 = _a.sent();
                    console.error('Failed to fetch product:', error_4);
                    throw new Error('Failed to fetch product.');
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getReviewsByProductId = getReviewsByProductId;
function getProductsByCollection(collectionId) {
    return __awaiter(this, void 0, void 0, function () {
        var product, results, processed, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["SELECT * FROM HandcraftedHavenProducts WHERE collection=", ""], ["SELECT * FROM HandcraftedHavenProducts WHERE collection=", ""])), collectionId)];
                case 1:
                    product = _a.sent();
                    results = product.rows;
                    processed = results.map(function (item) {
                        var picArray = JSON.parse(item.pictures[0].replace("{", "[").replace("}", "]"));
                        item.pictures = { small: picArray[0], medium: picArray[1], big: picArray[2] };
                        return item;
                    });
                    return [2 /*return*/, processed];
                case 2:
                    error_5 = _a.sent();
                    console.error('Failed to fetch product:', error_5);
                    throw new Error('Failed to fetch product.');
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getProductsByCollection = getProductsByCollection;
function getProductsByCategory(categoryID) {
    return __awaiter(this, void 0, void 0, function () {
        var product, results, processed, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["SELECT * FROM HandcraftedHavenProducts WHERE category=", ""], ["SELECT * FROM HandcraftedHavenProducts WHERE category=", ""])), categoryID)];
                case 1:
                    product = _a.sent();
                    results = product.rows;
                    processed = results.map(function (item) {
                        var picArray = JSON.parse(item.pictures[0].replace("{", "[").replace("}", "]"));
                        item.pictures = { small: picArray[0], medium: picArray[1], big: picArray[2] };
                        return item;
                    });
                    return [2 /*return*/, processed];
                case 2:
                    error_6 = _a.sent();
                    console.error('Failed to fetch product:', error_6);
                    throw new Error('Failed to fetch product.');
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getProductsByCategory = getProductsByCategory;
function getArtisanByProduct(product) {
    return __awaiter(this, void 0, void 0, function () {
        var value, product_1, results, picArray, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    value = "";
                    if (typeof product == 'string') {
                        value = product;
                    }
                    else if ('collection' in product)
                        value = product.collection;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["SELECT * FROM HandcraftedHavenArtisans WHERE collection=", ""], ["SELECT * FROM HandcraftedHavenArtisans WHERE collection=", ""])), value)];
                case 2:
                    product_1 = _a.sent();
                    results = product_1.rows[0];
                    picArray = JSON.parse(results.pictures[0].replace("{", "[").replace("}", "]"));
                    results.pictures = { small: picArray[0], medium: picArray[1], big: picArray[2] };
                    return [2 /*return*/, results];
                case 3:
                    error_7 = _a.sent();
                    console.error('Failed to fetch artisan:', error_7);
                    throw new Error('Failed to fetch artisan.');
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getArtisanByProduct = getArtisanByProduct;
function insertUserAndArtisan(user, artisan, collection) {
    return __awaiter(this, void 0, void 0, function () {
        var result, id, _a, error_8, error_9, pictureArray, error_10;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = { value: { rows: [{ nextval: '' }] } };
                    id = { value: '' };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    _a = result;
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["SELECT nextval('handcraftedhavenusers_id_seq');"], ["SELECT nextval('handcraftedhavenusers_id_seq');"])))];
                case 2:
                    _a.value = _b.sent();
                    id.value = result.value.rows[0].nextval;
                    console.log(id);
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n      INSERT INTO HandcraftedHavenUsers (id, username, email, password)\n      VALUES (", ", ", ", ", ", ", ")\n      "], ["\n      INSERT INTO HandcraftedHavenUsers (id, username, email, password)\n      VALUES (", ", ", ", ", ", ", ")\n      "])), id.value, user.username, user.email, user.password)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_8 = _b.sent();
                    // If a database error occurs, return a more specific error.
                    console.error(error_8);
                    return [2 /*return*/, {
                            message: 'Database Error: Failed to Create User.',
                        }];
                case 5:
                    _b.trys.push([5, 7, , 10]);
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n      INSERT INTO HandcraftedHavenCollections (id, name)\n      VALUES (", ", ", ")\n      "], ["\n      INSERT INTO HandcraftedHavenCollections (id, name)\n      VALUES (", ", ", ")\n      "])), collection.id, collection.name)];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 7:
                    error_9 = _b.sent();
                    console.error(error_9);
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n      DELETE FROM HandcraftedHavenUsers WHERE id=", "\n      "], ["\n      DELETE FROM HandcraftedHavenUsers WHERE id=", "\n      "])), id.value)];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["SELECT setval('handcraftedhavenusers_id_seq', ", ", false);"], ["SELECT setval('handcraftedhavenusers_id_seq', ", ", false);"])), id.value)];
                case 9:
                    _b.sent();
                    return [2 /*return*/, {
                            message: 'Database Error: Failed to Create Collection.',
                        }];
                case 10:
                    _b.trys.push([10, 12, , 16]);
                    pictureArray = "{\"".concat(artisan.picture.small, "\",\"").concat(artisan.picture.medium, "\",\"").concat(artisan.picture.big, "\"}");
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n      INSERT INTO HandcraftedHavenArtisans (id, name, description, collection, pictures)\n      VALUES (", ", ", ", ", ", ", ", ARRAY[", "])\n      "], ["\n      INSERT INTO HandcraftedHavenArtisans (id, name, description, collection, pictures)\n      VALUES (", ", ", ", ", ", ", ", ARRAY[", "])\n      "])), id.value, artisan.name, artisan.description, artisan.collection, pictureArray)];
                case 11:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 12:
                    error_10 = _b.sent();
                    console.error(error_10);
                    // If a database error occurs, return a more specific error.
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n      DELETE FROM HandcraftedHavenUsers WHERE id=", "\n      "], ["\n      DELETE FROM HandcraftedHavenUsers WHERE id=", "\n      "])), id.value)];
                case 13:
                    // If a database error occurs, return a more specific error.
                    _b.sent();
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n      DELETE FROM HandcraftedHavenCollections WHERE id=", "\n      "], ["\n      DELETE FROM HandcraftedHavenCollections WHERE id=", "\n      "])), collection.id)];
                case 14:
                    _b.sent();
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_16 || (templateObject_16 = __makeTemplateObject(["SELECT setval('handcraftedhavenusers_id_seq', ", ", false);"], ["SELECT setval('handcraftedhavenusers_id_seq', ", ", false);"])), id.value)];
                case 15:
                    _b.sent();
                    console.log('User was deleted');
                    return [2 /*return*/, {
                            message: 'Database Error: Failed to Create Artisan.',
                        }];
                case 16: return [2 /*return*/];
            }
        });
    });
}
exports.insertUserAndArtisan = insertUserAndArtisan;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var user, artisan, product, reviews, productsByCollection, productsByCategory, artisanByProduct, artisanByCollectionID, newUser, newCollection, newArtisan, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserByEmail('GenevaBahringer@crafts.net')];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, getArtisanById(1)];
                case 2:
                    artisan = _a.sent();
                    return [4 /*yield*/, getProductById('a3d13e0a-4d4f-429a-b63e-39a2e981b90c')];
                case 3:
                    product = _a.sent();
                    return [4 /*yield*/, getReviewsByProductId('a3d13e0a-4d4f-429a-b63e-39a2e981b90c')];
                case 4:
                    reviews = _a.sent();
                    return [4 /*yield*/, getProductsByCollection('aee9ab1d-e601-474d-a0fd-33bc1fafae55')];
                case 5:
                    productsByCollection = _a.sent();
                    return [4 /*yield*/, getProductsByCategory(1)];
                case 6:
                    productsByCategory = _a.sent();
                    return [4 /*yield*/, getArtisanByProduct(product)];
                case 7:
                    artisanByProduct = _a.sent();
                    return [4 /*yield*/, getArtisanByProduct(product.collection)];
                case 8:
                    artisanByCollectionID = _a.sent();
                    console.log('userById:');
                    console.log(user);
                    console.log('artisanById:');
                    console.log(artisan);
                    console.log('productById:');
                    console.log(product);
                    console.log('reviewsFromProductId:');
                    console.log(reviews);
                    console.log('productsByCollection:');
                    console.log(productsByCollection);
                    console.log('productsByCategory:');
                    console.log(productsByCategory);
                    console.log('artisanByProduct:');
                    console.log(artisanByProduct);
                    console.log('artisanByCollectionID:');
                    console.log(artisanByCollectionID);
                    newUser = {
                        id: 9,
                        username: "AaronBurr",
                        email: "AaronBurr@crafts.net",
                        password: "123456"
                    };
                    newCollection = {
                        id: (0, crypto_1.randomUUID)(),
                        name: "".concat(newUser.username, " Items")
                    };
                    newArtisan = {
                        id: 9,
                        name: "Aaron Burr",
                        description: "Burr is great man.",
                        collection: newCollection.id,
                        picture: {
                            small: "sd",
                            medium: "sdsdsd",
                            big: "bgfbasd"
                        }
                    };
                    console.log('insert test.');
                    return [4 /*yield*/, insertUserAndArtisan(newUser, newArtisan, newCollection)];
                case 9:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
main();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16;
