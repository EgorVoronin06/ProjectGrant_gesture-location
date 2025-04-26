"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
exports.default = {
    dialect: 'postgresql',
    schema: './src/**/*.entity.ts',
    dbCredentials: {
        host: config_1.default.dbHost,
        port: +config_1.default.dbPort,
        database: config_1.default.dbName,
        user: config_1.default.dbUser,
        password: config_1.default.dbPassword,
    },
    out: './migrations',
    verbose: true,
    strict: true,
};
//# sourceMappingURL=drizzle.config.js.map