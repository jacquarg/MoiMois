## moi

Des nouvelles fraîches sur vous ? Feuilletez le magazine qui vous raconte votre propre histoire. Découvrez les gros titres du moment, les petits rien de votre quotidien ...

## Roadmap

[v] Inviter à configurer des Konnectors.
[v] Ajouter la version de l'app dans le DocType version
[p] Ajouter des visualisations
[] Préférences, masquer les ad pour certaines données
[] Tester l'envois de mail, préférence pour stopper les mails

### Bugs

* Éditions en doublons.
* Lenteurs, manque de feedback à la création.


#### Données bancaires

* Calcul "équivalent de x,x grammes d'or" ~~
* argent que vous avez retiré '0'
* '-', ordre inversé et titre de top 3 des crénaux horaires sur les valeurs.




## En développement !

### Proposer de nouvelles inteerprétations de données !

#### Events
* Numbers (chiffres) :
** Évènement le plus long (en minutes ou secondes :)

* Cursors (jauges) : 
** Poule / Fétard : poule si + de rdv entre 7h et 19h / et inversement.
** Régulier / Ponctuel-sérendipité : si plus évènement récurrent que ponctuels

* Viz :
** En bares : durée de RDV selon les jours de la semaines


#### Contacts

* Badge : 
** Cosmopolite : si plusieurs indicatif téléphoniques différents dans les contacts.
** Réseauteur / Homme de réseau ... : tous les 50 contacts.

* Numbers (chiffres) :
** + XX contacts ce mois-ci !



Pour tester cette application :
```
git clone ...
npm install

# Ajout des données de tests
npm install -g cozy-fixtures
cozy-fixtures load tests/fixtures/

cd client
npm install

```

## À propos de MesInfos

http://mesinfos.fing.org
