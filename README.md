## MesConso

Application permettant une première visualisation simple de données MesInfos (sur la personnes, tickets de caisses, et journal d'appel (bientôt)).

## En développement !

Pour tester cette application :
```
git clone ...
npm install

# Ajout des données de tests
npm install -g cozy-fixtures
cozy-fixtures load tests/fixtures/

cd client
npm install

# Brunch n'a pas encore été convenablement configuré pour less sur ce projet.
lessc app/styles/custom.less > public/stylesheets/app.css && brunch b
```

## À propos de MesInfos

http://mesinfos.fing.org
