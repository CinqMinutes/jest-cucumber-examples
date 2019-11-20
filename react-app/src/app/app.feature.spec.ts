import { defineFeature, loadFeature } from 'jest-cucumber';
import AppNumbers from './app.pure';

const feature = loadFeature('./src/app/app.feature');

const addNumber = (given, numbers: AppNumbers) => {
  given(/^J'entre (.*) dans le calculateur$/, nombre => {
    numbers.ajoute(parseInt(nombre));
  });
};

defineFeature(feature, test => {
  test('Ajouter deux nombres', ({ given, when, then }) => {
    const numbers: AppNumbers = new AppNumbers();
    let somme: number = 0;
    addNumber(given, numbers);
    addNumber(given, numbers);
    when("Je lance l'addition", () => {
      somme = numbers.somme();
    });
    then(/^J'obtiens (.*)$/, resultat => {
      expect(somme).toBe(parseInt(resultat));
    });
  });
});
