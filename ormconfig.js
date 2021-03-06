console.log('Ambiente:', process.env.NODE_ENV, "- Banco tipo:", "postgres");
module.exports = {    
    "type": process.env.NODE_ENV == "postgres",
    "url": process.env.DATABASE_URL,
    "synchronize": true,
    "entities": [
      process.env.NODE_ENV == "development" ? "dist/models/**/*.js" : "src/models/**/*.ts"
    ],
      "migrations": [
      process.env.NODE_ENV == "development" ? "dist/database/migrations/**/*.js" : "src/database/migrations/**/*.ts"      
    ],
    "cli":{
    "migrationsDir": [
        "src/database/migrations/"
      ],
      "entitiesDir": "src/models"
    }
}