# Le BDD avec React

En respectant tout ce qui est écrit sur le [README](../README.md), créons notre application en React avec Typescript.

## Création du projet

Pour créer un projet facilement et rapidement, commençons par utiliser le CRA ([Create React App](https://github.com/facebook/create-react-app))

```shell
# npx create-react-app react-app --typescript
# cd react-app
```

Une fois le projet créé, nous pouvons déjà l'exécuter et lancer les tests :

```shell
# yarn start
# yarn test
```

Sur VSCode, par exemple, la fonctionnalité `Split terminal` permet d'afficher les deux résultats

Avant de commencer les développements, à proprement parler, commençons par réorganiser un peu le code et préparons le terrain.

Déplaçons les fichiers `App.*` dans un répertoire `app` puis créons un fichier `index.ts` dans ce nouveau répertoire :

```typescript
export { default as App } from './App';
```

De cette manière, dans le fichier de démarrage n'aura pas à faire

```typescript
import App from './app/App';
```

mais

```typescript
import { App } from './app';
```

J'admets que ce n'est qu'estétique, mais, lorsque vous aurez des dizaines de répertoires qui contiendrons des sous répertoires, la lecture du code en sera simplfiée.

Voyez donc ça comme un exemple et une réflexe à avoir.

Ne nous arrêtons pas là et retirons `App.css`, `logo.svg` ainsi que le contenu de App.tsx pour obtenir :

```typescript
import React from 'react';

const App: React.FC = () => <div />;

export default App;
```

L'avantage de cette action est double : on retire le design inutile et on retire du code non testé.

## Ajout des dépendances nécessaires

### Pour le style

Pour le style, nous utiliserons SASS. C'est une extension de CSS qui en fait un vrai langage de programmation en permettangt les boucles, les conditions, etc.

Pour l'installer sur notre projet, lançons un :

```shell
# yarn add node-sass
```

puis renommons notre `index.css` en `index.scss` (y compris dans index.tsx).

Etant donné que le SASS dérive du CSS, changer l'extension sans changer le code n'a aucun impact.

### Outils de test

#### Première chose : installer Enzyme

```shell
yarn add enzyme @types/enzyme enzyme-adapter-react-16 @types/enzyme-adapter-react-16 jest-enzyme -D
```

Enzyme est un ensemble d'outils, développés par [AirBNB](https://github.com/airbnb/enzyme), qui facilite le test de composants React.

Pour qu'il soit configuré automatiquement pour tous les tests, créons notre fichier `/src/setupTests.ts` avec le contenu :

```typescript
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

Il sera automatiquement exécuté avant chaque test.

#### Seconde chose : installer Gherkin et Jest Cucumber.

Pour installer Gherkin, il faut se baser sur les extensions de votre IDE. Pour VSCode, par exemple, vous pouvez utiliser [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)

```shell
# code --install-extension alexkrechik.cucumberautocomplete
```

Pour Atom, vous pouvez tester l'extention [laguage-gherkin](https://atom.io/packages/language-gherkin).

Une fois que votre IDE comprend et colore syntaxiquement vos instructions Gherkin, vous pouvez ajouter [jest-cucumber](https://github.com/bencompton/jest-cucumber) à votre projet :

```shell
# yarn add jest-cucumber
```

### Routing

Pour bien séparer nos fonctionnalités, nous pouvons utiliser les routes HTML.

Commençons par installer nos dépendances :

```shell
# yarn add react-router react-router-dom
```

```shell
# yarn add @types/react-router @types/react-router-dom -D
```

Continuons en créant le fichier `router.tsx`, fichier qui permettra de centraliser les routes principales.

Bien sûr, il nous faut commencer par les tests
`router.spec.tsx`

```tsx
import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { App } from './app';
import AppRouter from './router';
import { mount } from 'enzyme';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';

describe('Routing switch verifications', () => {
  test('/ => App', () => {
    const wrapper = mount(
      <Router initialEntries={['/']}>
        <AppRouter />
      </Router>
    );
    expect(wrapper.find(App).length).toBe(1);
  });

  test('Automatic redirect to "/"', () => {
    const root = document.createElement('div');
    document.body.appendChild(root);
    let globalLocation = { pathname: '' };
    render(
      <Router initialEntries={['/not-accepted-route']}>
        <AppRouter />
        <Route
          path="*"
          render={({ location }) => {
            globalLocation = location;
            return null;
          }}
        />
      </Router>,
      root
    );

    act(() => {
      // example: click a <Link> to /not-accepted-route
    });

    expect(globalLocation.pathname).toBe('/');
  });
});
```

`router.tsx`

```tsx
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { App } from './app';

export default () => (
  <Switch>
    <Route exact path="/">
      <App />
    </Route>
    <Redirect to="/" />
  </Switch>
);
```

Pour qu'il soit utilisé, nous devons le référencer comme composant dans `index.tsx`. Par contre, pour pouvoir gérer nos routes dans l'application, nous devrons utiliser le `BrowserRouter` de `react-router-dom`.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AppRouter from './router';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <AppRouter />
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

Nous voilà enfin prêts pour commencer le développement des fonctionnalités.

## S'initier au Gherkin

Faisons juste un petit exercice pour nous familiariser avec le Ghrkin et son automatisation.

Aller, imaginons que nous sommes tous très fatigués et que nous avons confondu app et add...

Nous ajoutons donc le fichier `app.feature` dans le répertoire app :

```gherkin
Feature: Addition
    Sans même réfléchir, je confonds app et add.
    Du coup, je spécifie une addition

    Scenario: Ajouter deux nombres
        Given J'entre 50 dans le calculateur
        And J'entre 70 dans le calculateur
        When Je lance l'addition
        Then J'obtiens 120
```

Notez bien que :

1. le mot clé `Feature` donne un titre et une description à la fonctionnalité souhaitée (1 `Feature` par fichier feature)
1. le mot clé `Scenario` désigne un comportement attendu. Il peut y avoir un à plusieurs scenarii par `Feature`
1. `Given` pose le contexte, les conditions de départ
1. `When` concrétise l'action qui déclenche le comportement attendu.
1. `Then` indique le résultat attendu (c'est ici que l'on trouvera le ou les `expect`)
1. `And` répète juste l'instruction précédente. Dans notre cas, remplacer `And` par `Given` n'aurait aucune incidence.

Pour automatiser ce cas de test, je vais créer un fichier `app.feature.spec.ts` (oui, l'exécution de vos scenarii se fera avec vos TU. Pas besoin d'une commande supplémentaire) :

```typescript
import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('./src/app/app.feature');

const addNumber = (given, numbers) => {
  given(/^J'entre (.*) dans le calculateur$/, nombre => {
    numbers.push(parseInt(nombre));
  });
};

defineFeature(feature, test => {
  test('Ajouter deux nombres', ({ given, when, then }) => {
    const numbers: Array<number> = [];
    let somme: number = 0;
    addNumber(given, numbers);
    addNumber(given, numbers);
    when("Je lance l'addition", () => {
      somme = numbers.reduce((p, n) => p + n);
    });
    then(/^J'obtiens (.*)$/, resultat => {
      expect(somme).toBe(parseInt(resultat));
    });
  });
});
```

Dans ce code, plusieurs choses à retenir :

- J'ai sorti le `given` dans une méthode pour pouvoir le réutiliser.
- le loadFeature se base sur le répertoire du `package.json`.
- Et, surtout, le code est encore dans le test !

Donc, oui, il ne nous reste plus qu'à sortir ce code dans une classe prévue à cet effet `app.pure.ts` (`pure` signifiant qu'elle est totalement indépendante et réutilisable)

```typescript
class AppNumbers {
  private nombres: Array<number> = [];

  ajoute = (nombre: number) => this.nombres.push(nombre);
  somme = () => this.nombres.reduce((p, n) => p + n);
}

export default AppNumbers;
```
