# jest-cucumber-examples

Quelques exemples pour apprendre à piloter ses devs par les comportements en React, Angular et Vue

## Qu'allons nous coder ?

Quitte à faire une application d'exemple, autant s'approcher le plus possible de ce que nous pourrions faire dans la réalité.
Bon, nous n'allons pas coder un magasin en ligne mais, peut-être, un outil de souscription à un service avec abonnement.

Celà pourrait se résumer en 4 pages web :

1. Sélection du produit et des détails
1. Information personnelles
1. Tarification
1. Confirmation / Validation

Pour la partie design, nous nous baserons le [Google's Material Design](https://material.io/design/introduction/).

## Stacks techniques

Afin de vous présenter le panel le plus représentatif des possibiltés web, je vous propose trois exemples basés sur les trois technologies du moment.

### ReactJS

Créée par Jordan Walke (Facebook) en 2011, React est une bibliopthèque Javascript d'interface graphique basée sur un DOM virtuel (JSDOM) synchronisé avec le DOM réel.

Pour créer facilement une application react, il est conseillé d'utiliser le `create-react-app`.

### Angular

Angular (2+) est un framework web Opensource créé par Google. Il est basés sur Typescript, RxJS (Reactive programming Javascript) et AngularCLI, un client en ligne de commande qui permet de piloter la création mais aussi l'alimentation et la mise à jour des projets Angular.

### VueJS

VueJS est un framework web Opensource créé par Evan YOU, ancien développeur Google sur le projet AngukarJS.
Il présente une architecture pouvant être adoptée progressivement, axée sur le rendu déclaratif et la composition des composants.

Comme Angular, ce framework met aussi à disposition un client en ligne de commande (mais aussi graphique) très poussé.

## Nos pratiques

Pour une qualité et une lisibilité optimale du code, pour un code réellement adapté au besoin et, enfin, pour un code avec une quantité minimale de bug/vulnérabilité, et ce, quelque soit la technologie, il nous faut des outils techniques mais aussi méthodologiques.

Pour la technique, l'indispensable et le minimum à avoir sont :

- Un IDE (VSCode, Visual Studio, IntelliJ, etc.)
- Un linter (ESLint, TSLint, StyleLint, etc.)
- Un analyseur statique de code (Sonarqube, etc.)
- Un language ou superset typé

Pour la méthodologie, vous trouverez tout ce qu'il ci-dessous.

### TDD (Test Driven Development)

Le TDD (Développement piloté par les tests en français) est une méthode de développement qui consiste à réaliser les tests avant d'écrire le code de production.

Le principe est simple :

1. On écrit un test qui correspond au besoin
2. On vérifie qu'il échoue (si ce n'est pas le cas, c'est que le test doit être revu)
3. On implémente du code de production jusqu'à ce que le test passe au vert
4. On refactorise en faisant attention de garder tous ses tests au vert
5. On passe au test suivant

Dans le cas d'une résolution de bug, le traitement est sensiblement le même :

1. On écrit deux tests : une qui reproduit le bug (vert) et un qui correspond au comportement attendu (rouge)
2. On implémente du code de production qui inverse le résultat des deux tests
3. On supprime le test qui reproduit le bug
4. On refactorise en faisant attention de garder tous ses tests au vert
5. On passe au bug suivant

#### De l'intérêt des mocks

Mocker un élément de son code est un couplage fort entre le test et la modélisation, ce qui augmente drastiquement la compléxité et la maintenabilité des tests. Multiplier les mocks force votre code de production à être "testable", pas dans le bon terme mais celui qui érode le code et le rend moins lisible.

Sur un projet front web (Javascript), le seul mock réellement indispensable est celui qui communique avec l'API (le fetch ou le getJson pour RxJS)

Il existe un très bon article (en anglais) sur le sujet [Mocking is a code smell](https://goo.gl/7VXZAS)

### BDD (Behavior Driven Development)

Le BDD (développement piloté par les comportements) reste un développement piloté par les tests mais ces tests sont des tests de comportement.

En gros, nous définissons un comportement attendu avec des exemples concrets et nous nous en servons comme base pour réaliser nos tests qui piloteront nos développements.

L'avantage de cette pratique, face aux tests unitaires, est l'utilisation du language [Gherkin](https://docs.cucumber.io/gherkin/reference/). Il permet de rendre les tests compréhensibles dans un non-spécialiste du développement (un PO, un client, etc.). Il peut ainsi, popentiellement, aller directement chercher dans le code et comprendre le comportement de l'application.

Pour plus d'informations sur le BDD, je vous conseille le site [cucumber.io](https://docs.cucumber.io/bdd/)

### SOLID

SOLID est un ensemble de principes qui répond à une problématique d'évolutivité du code source. Ils sont dans le livre `Agile Software Development, Pinciples, Patterns and Practices` de Robert C. Martin.

#### Single responsibility principle

Comme son nom l’indique, ce principe signifie qu’une classe ne doit posséder qu’une et une seule responsabilité.

#### Open close principle

Les classes et les méthodes doivent être ouvertes à l'extension mais fermées à la modification.

#### Liskov principle

"[...]La notion de sous-type telle que définie par Liskov et Wing est fondée sur la notion de substituabilité : si `S` est un sous-type de `T`, alors tout objet de type `T` peut être remplacé par un objet de type `S` sans altérer les propriétés désirables du programme concerné.

Le principe de Liskov impose des restrictions sur les signatures sur la définition des sous-types :

- Contravariance des arguments de méthode dans le sous-type.
- Covariance du type de retour dans le sous-type.
- Aucune nouvelle exception ne doit être générée par la méthode du sous-type, sauf si celles-ci sont elles-mêmes des sous-types des exceptions levées par la méthode du supertype.
- On définit également un certain nombre de conditions comportementales (voir la section Conception par contrat).(...)", [Wikipedia](https://fr.wikipedia.org/wiki/Principe_de_substitution_de_Liskov)

#### Interface segregation principle

L'objectif est d'utiliser les interfaces pour définir des contrats qui répondent à un besoin fonctionnel pour créer une abstraction et réduire le couplage.

**ATTENTION**

> L'utilisation systèmatique des interfaces pour chaque classe est un anti-pattern.

> Pensez à faire preuve de bon sens et de pragmatisme !

#### Dependency inversion principle

Ce principe consiste à rendre indépendant les modules de haut niveau de eux de bas niveau en inversant ces relations.

En gros :

- Les modules de haut niveau et les modules de bas niveau dépendent d'abstractions pour casser le lien de dépendance haut vers bas.
- Les abstractions ne doivent pas dépendre des détails. Les détails doivent dépendre des abstractions.

### Clean Code, Refactoring, Code Review

Ces termes résumes 3 principes de base du développeur :

- Rendre le code dans un meilleur état que celui dans lequel on l'a trouvé.
- L'état de l'art évolue et la perfection n'existe pas, il faut donc toujours retravailler son code
- Tout code rédigé ne peut être intégré s'il n'a pas été revu par vos pairs

Pour les code review, il existe deux outils :

1. **Revue de code :** moment passé entre développeurs pour trouver un maximum de bug, vulnérabilité ou code smell.
2. **Pull request :** même principe que la revue de code mais de façon asynchrone.

#### Regrouper son code par fonctionnalité métier

L'objectif est de regrouper le code source de façon à ce qu'un product owner ou un client puisse s'y retrouver.

Voici un exemple en typescript :

```typescript
src
 |_ ma-premiere-fonctionnalité
     |_ ma-premiere-fonctionnalité.feature // Définition de comportement attendu
     |_ ma-premiere-fonctionnalité.feature.spec.ts // automatisation des tests
     |_ sous-fonctionnalité-1
        |_ sous-fonctionnalité-1.feature
        |_ ...
     |_ sous-fonctionnalité-2
     |_ ...
  |_ ma-seconde-fonctionnalité
  |_ ...
```

#### Pourquoi utiliser `typescript` ?

Pour quelques raisons simples :

- L'utilisation des types sécurise le code et vous alerte de toute incohérence
- Vous aide à mieux comprendre comment fonctionne vos libraries (`recompose` n'est pas magique)
- Vous permet d'être dans l'état de l'art du javascript en avance de phase (oui, Typescript, c'est du Javascript !)
