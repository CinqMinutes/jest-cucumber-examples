Feature: Météo

    Permet d'afficher la météo

    Scenario: Aller sur la page permet de saisir le lieu
        When Je vais sur la route '/meteo/France/Lille'
        Then J'obtiens la 'description' météo 'nuageux'
