# jest-cucumber-examples

Quelques exemples pour apprendre à piloter ses devs par les comportements en React, Angular et Vue

## Qu'allons nous coder ?

Un outil statistique qui ressence la population par pays.

Pour se faire, nous allons utiliser une API publique et gratuite : http://api.population.io/
Nous pourrons donc nous concentrer sur la création web.

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

### Clean Code, Refactoring, Code Review

#### Regrouper son code par fonctionnalité métier

#### Pourquoi utiliser `typescript` ?
