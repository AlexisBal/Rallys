import React from 'react'
import { Text, View } from '../components/Themed';
import { StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Constants from 'expo-constants';

type Props = StackScreenProps<RootStackParamList, 'Regles'>;

export class Regles extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  
  render() {
    const rallye = this.props.route.params.rallye;
    const texte = 'Plusieurs itinéraires seront disponibles. Chacun d’entre eux vous proposera des photos et des questions relatives à l’histoire des sites ou du village.\n\nSur une seule et même application téléchargée, vous pouvez jouer tout seul ou à plusieurs.\nSi vous souhaitez jouer en équipe, chaque chef d’équipe télécharge son application et choisit un itinéraire différent.\n\nA la fin du parcours pédestre (environ 1h30 à 2h) vous obtiendrez les résultats de votre questionnaire.'
    const { navigate } = this.props.navigation
    function Notif() {
      Alert.alert(
        "EN COURS DE DEVELOPPEMENT",
        "Pas encore disponible, revenez plus tard !",
        [
          {
            text: "Annuler",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Retour menu", onPress: () => navigate("Accueil") }
        ],
        { cancelable: false }
      );
    }
    return (
      <View style={styles.main_container}>
          <Text style={styles.titre}>
              Règles du jeu
          </Text>
          <View style={styles.container}>
              <Text style={styles.texte}>
                {texte}
              </Text>
          </View>
          <View style={styles.button}>
              <Button buttonStyle={{borderRadius: 30, height:50}}  containerStyle={{borderRadius: 30}} type="outline" title='Démarrer le rallye' onPress={() => {
                  if (rallye.rallye.statut == true) {
                    this.props.navigation.navigate("RallyeQuestionInit", { rallye })
                  }
                  else {
                    Notif()
                  }
              }}/>
          </View>
      </View>
    )
  }  
}

const styles = StyleSheet.create({
    main_container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
      paddingBottom: Constants.statusBarHeight,
    },
    container: {
      flex:6
    },
    titre: {
      flex:1,
      marginTop: 20,
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'left',
      paddingLeft: 20,
      paddingRight: 12
    },
    texte: {
      flex:1,
      fontSize: 20,
      textAlign: 'left',
      paddingLeft: 20,
      paddingRight: 12
    },
    button: {
      paddingLeft: 20,
      paddingRight: 20,
    }
})

