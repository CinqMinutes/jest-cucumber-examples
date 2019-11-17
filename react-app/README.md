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

```typescript
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { App } from './app';
import AppRouter from './router';
import { mount } from 'enzyme';

describe('Routing switch verifications', () => {
  test('/ => App', () => {
    const wrapper = mount(
      <Router initialEntries={['/']}>
        <AppRouter />
      </Router>
    );
    expect(wrapper.find(App).length).toBe(1);
  });
});
```

`router.tsx`

```typescript
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

```typescript
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
