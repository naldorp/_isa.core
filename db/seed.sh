mongo isaBrain --eval "db.commands.drop();  db.repairDatabase()"
mongoimport --db isaBrain --collection commands --file ./db/commands.json --jsonArray