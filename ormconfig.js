module.exports = {
    "type": "mssql",
    "url": process.env.DATABASE_URL,
    "synchronize": true,
    "entities": [
      "dist/models/**/*.js"
    ],
      "migrations": [
      "dist/database/migrations/**/*.js"
    ],
    "cli":{
    "migrationsDir": [
        "src/database/migrations/"
      ],
      "entitiesDir": "src/models"
    }
}