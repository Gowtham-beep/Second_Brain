"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db/db");
const app = (0, express_1.default)();
(0, db_1.DatabaseConnection)()
    .then(() => {
    app.listen(3000, () => {
        console.log("Serever is running on http://localhost:3000");
    });
})
    .catch((error) => {
    console.log("Failed to connect to the database:", error);
});
