## moi

Des nouvelles fraîches sur vous ? Feuilletez le magazine qui vous raconte votre propre histoire. Découvrez les gros titres du moment, les petits rien de votre quotidien ...

## Roadmap

[v] Inviter à configurer des Konnectors.
[v] Ajouter la version de l'app dans le DocType version
[v] Ajouter des visualisations
[p] Préférences, masquer les ad pour certaines données
[] Tester l'envois de mail, préférence pour stopper les mails

### Bugs

* Éditions en doublons.
* Lenteurs, manque de feedback à la création.


#### Données bancaires

[v] Calcul "équivalent de x,x grammes d'or" ~~
[v] argent que vous avez retiré '0'
[v] '-', ordre inversé et titre de top 3 des crénaux horaires sur les valeurs.


## En développement !

### Proposer de nouvelles inteerprétations de données !

#### Events
* Numbers (chiffres) :
** Évènement le plus long (en minutes ou secondes :)

* Cursors (jauges) :
** Poule / Fétard : poule si + de rdv entre 7h et 19h / et inversement. [2016-08-26](d7dc375e478879a3d86974af131352cdb3339104)
** Routinier / Aventureux : si plus évènement récurrent que ponctuels. [2016-08-26](d7dc375e478879a3d86974af131352cdb3339104)

* Viz :
** En bares : durée de RDV selon les jours de la semaines [2016-08-26](e266e0fee2a6b89272cd3ac8545541bd21e79aac)


#### Contacts

* Badge :
** Cosmopolite : si plusieurs indicatif téléphoniques différents dans les contacts.
** Réseauteur / Homme de réseau ... : tous les 50 contacts.

* Numbers (chiffres) :
** + XX contacts ce mois-ci !

#### ConsumptionStatement (Electricité EDF)

* Viz :
** Top 5 : l'année la moins consomatrice d'énergie

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
