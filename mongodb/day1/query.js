db = db.getSiblingDB('blogger');
db.articles.find().forEach(printjson);
