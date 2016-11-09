## moi

Des nouvelles fraîches sur vous ? Feuilletez le magazine qui vous raconte votre propre histoire. Découvrez les gros titres du moment, les petits rien de votre quotidien ...

## Roadmap

* Affichage des exploits du mois
* Légende / explication du calcul pour chaque viz
* Visualisation des détails du calcul : quelles données conduisent à ce résultat
* Sélectionner les données à prendre en compte pour chaque visualisation.
* Inviter à configurer des Konnectors.
* Ajouter des visualisations
* Préférences, masquer les ad pour certaines données

### Bugs

* Éditions en doublons.
* Lenteurs, manque de feedback à la création.
* Vos exploits, parfois vide.
* Pas de message si pas de données (écran vide ...)


## En développement !

### Proposer de nouvelles interprétations de données !

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

# Pour tester cette application :
```
git clone ...
npm install


cd client
npm install

```

## À propos de MesInfos

http://mesinfos.fing.org
