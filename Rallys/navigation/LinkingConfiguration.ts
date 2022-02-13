import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Accueil: {
            screens: {
              Accueil: 'Accueil',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
        },
      },
      Main: {
        screens: {
          Accueil: {
            screens: {
              Accueil: 'Accueil',
            },
          },
          RallyesDisponibles: {
            screens: {
              RallyesDisponibles: 'Rallyes Disponibles',
            },
          },
          RallyeIndisponible: {
            screens: {
              RallyeIndisponible: 'Rallyes Indisponibles',
            },
          },
          AccueilRallye: {
            screens: {
              AccueilRallye: 'Accueil Rallye',
            },
          },
          Regles: {
            screens: {
              Regles: 'Règles',
            },
          },
          RallyeEtape1: {
            screens: {
              RallyeEtape1: 'Rallye Etape 1',
            },
          },
          RallyeQ1: {
            screens: {
              RallyeQ1: 'Rallye Q1',
            },
          },
          RallyeQ2: {
            screens: {
              RallyeQ2: 'Rallye Q2',
            },
          },
          RallyeQ3: {
            screens: {
              RallyeQ2: 'Rallye Q3',
            },
          },
          RallyeQ4: {
            screens: {
              RallyeQ2: 'Rallye Q4',
            },
          },
          RallyeQ5: {
            screens: {
              RallyeQ2: 'Rallye Q5',
            },
          },
          RallyeQ6: {
            screens: {
              RallyeQ2: 'Rallye Q6',
            },
          },
          RallyeQ7: {
            screens: {
              RallyeQ2: 'Rallye Q7',
            },
          },
          RallyeQ8: {
            screens: {
              RallyeQ2: 'Rallye Q8',
            },
          },
          RallyeQ9: {
            screens: {
              RallyeQ2: 'Rallye Q9',
            },
          },
          RallyeQ10: {
            screens: {
              RallyeQ2: 'Rallye Q10',
            },
          },
          RallyeQ11: {
            screens: {
              RallyeQ2: 'Rallye Q11',
            },
          },
          RallyeQ12: {
            screens: {
              RallyeQ2: 'Rallye Q12',
            },
          },
          RallyeQ13: {
            screens: {
              RallyeQ2: 'Rallye Q13',
            },
          },
          RallyeQ14: {
            screens: {
              RallyeQ2: 'Rallye Q14',
            },
          },
          RallyeQ15: {
            screens: {
              RallyeQ2: 'Rallye Q15',
            },
          },
          RallyeQ16: {
            screens: {
              RallyeQ2: 'Rallye Q16',
            },
          },
          Fin: {
            screens: {
              Fin: 'Résultats',
            },
          },
        }
      },
      RechercheScreen: {
        screens: {
          RechercheScreen: {
            screens: {
              RechercheScreen: 'RechercheScreen',
            },
          },
        }
      }
    },
  },
};
