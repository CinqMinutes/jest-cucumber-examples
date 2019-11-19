Feature: Addition
    Sans même réfléchir, je confonds app et add.
    Du coup, je spécifie une addition

    Scenario: Ajouter deux nombres
        Given J'entre 50 dans le calculateur
        And J'entre 70 dans le calculateur
        When Je lance l'addition
        Then J'obtiens 120