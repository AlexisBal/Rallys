export type RootStackParamList = {
  Root: undefined;
  Main: undefined;
  ReponseScreen: undefined;
  Accueil: undefined;
  RechercheScreen: undefined;
  RallyesDisponibles: {
    list_rallye: []
  };
  RallyeIndisponible: undefined;
  AccueilRallye: {
    rallye: {}
  };
  Regles: {
    rallye: object,
  };
  rallye: {
    title: string,
    nom: string,
    duree: string,
    description: string,
    statut: string,
    photo1: string,
  };
  RallyeQuestion: undefined;
  ScoreRallye: {
    rallye: {
      id: number,
      title: string,
      nom: string,
      place_id: string,
      distance: string,
      distancevalue: number,
      duree: string,
      description: string,
      statut: string,
      photo1: object,
      photo2: object,
      rallye: object,
    },
    id_parcours: number,
    rallyes_reponse: object
  };
};

export type BottomTabParamList = {
  Accueil: undefined;
  TabTwo: undefined;
  AccueilRallye: undefined;
  RallyesDisponibles: undefined;
};

export type AccueilParamList = {
  Accueil: undefined;
};

export type AccueilRallyeParamList = {
  AccueilRallye: undefined;
};

export type RallyesDisponiblesParamList = {
  RallyesDisponibles: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

