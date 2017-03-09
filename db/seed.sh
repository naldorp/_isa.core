mongo isaBrain --eval "db.commands.drop();  db.repairDatabase()"
mongoimport --db isaBrain --collection commands --file ./db/commands.json --jsonArray
mongoimport --db isaBrain --collection skills --drop --jsonArray  --file ./db/skills.json