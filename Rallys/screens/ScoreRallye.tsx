import React from 'react'
import { Text, View } from '../components/Themed';
import { StyleSheet, ScrollView } from 'react-native'
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';


type Props = StackScreenProps<RootStackParamList,  'ScoreRallye'>;

export class ScoreRallye extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    const id_parcours = this.props.route.params.id_parcours;
    const question = this.props.route.params.question;
    const rallye = this.props.route.params.rallye;
    const rallyes_reponse = this.props.route.params.rallyes_reponse;
    var score = this.props.route.params.score;
    const question_suivante = this.props.route.params.question_suivante;
    
    return (
        <View style={styles.main_container}>
            <View style={styles.header_container}>
                <Text style={styles.title2_text}>Votre score : {score}/20</Text>
            </View>
            <View style={styles.Button}>
                <Button type="clear" onPress={() => this.props.navigation.navigate("Accueil")} title="Retour au menu" />
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingTop: 2*Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    paddingLeft: 20,
    paddingRight: 20,
  },
  header_container: {
    flex: 1
  },
  Button: {
    marginTop: 15,
    flex:1,
  },
  innerText:{
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    texte: {
      marginTop: 20,
      fontSize: 20,
      fontStyle: 'italic',
      textAlign: 'left',
    },
    title_text: {
      fontWeight: 'bold',
      fontSize: 38,
      textAlign: 'center'
  },
  title2_text: {
      marginTop: 20,
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center'
  },
})
