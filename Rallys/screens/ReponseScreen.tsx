import React from 'react'
import { Text, View } from '../components/Themed';
import { StyleSheet, ScrollView } from 'react-native'
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import { ProgressBar } from 'react-native-paper';


type Props = StackScreenProps<RootStackParamList, 'ReponseScreen'>;

export class ReponseScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  
  render() {
    const id_question = this.props.route.params.id_question;
    const id_question_suivante = id_question + 1;
    const question = 'question' + id_question;
    const question_suivante = 'question' + id_question_suivante;
    const rallye = this.props.route.params.rallye;
    const rallyes_reponse = this.props.route.params.rallyes_reponse;
    var score = this.props.route.params.score;
    var etape_suivante = "RallyeQuestion"
    if (id_question == rallye.rallye.nombre_questions) {
      etape_suivante = "ScoreRallye";
    }
   
    // Liste des réponses sélectionnées 
    var rep_select = [];
    var x;
    for (x in rallyes_reponse[question]) {
      if (rallyes_reponse[question][x] == "A"){
        rep_select.push('reponse1');
      };
      if (rallyes_reponse[question][x] == "B"){
        rep_select.push('reponse2');
      };
      if (rallyes_reponse[question][x] == "C"){
        rep_select.push('reponse3');
      };
      if (rallyes_reponse[question][x] == "D"){
        rep_select.push('reponse4');
      };
      if (rallyes_reponse[question][x] == "E"){
        rep_select.push('reponse5');
      };
      if (rallyes_reponse[question][x] == "F"){
        rep_select.push('reponse6');
      };
      if (rallyes_reponse[question][x] == "G"){
        rep_select.push('reponse7');
      };
    }

    // Réponse sélectionnée globale 
    var rep = '';
    var x;
    for (x in rep_select) {
      if (rep != "") {
        rep = rep + ' - ' + rallye.rallye[question][rep_select[x]];
      }
      else {
          rep = rep + rallye.rallye[question][rep_select[x]];
      }
    }

    // Liste avec les reponses correctes 
    var rep_correct = [];
    var x;
    for (x in rallye.rallye[question].solution) {
      if (rallye.rallye[question].solution[x] != '-') {
        rep_correct.push(rallye.rallye[question].solution[x]);
      }
    }

    // Verification des réponses 
    var x;
    var y;
    var point = 0;
    var nombre_erreur = 0;
    for (x in rallyes_reponse[question]){
      for (y in rep_correct) {
        if (rallyes_reponse[question][x] == rep_correct[y]) {
          point = point + 1;
        }
      }
    }
    
    // Calcul du nombre d'erreur
    nombre_erreur = rallye.rallye[question].point - point;
    var text_erreur = '';
    if (nombre_erreur == 1 ) {
      text_erreur = 'Oups, il y a 1 erreur !';
    }
    else {
      text_erreur = 'Oups, il y a ' + nombre_erreur.toString() + ' erreurs !';
    }

    // Calcul du score total 
    score = score + point;

    // Avancée du rallye 
    const avancee = 0.0625 * id_question;

    // Affichage de la reponse
    if (point == rallye.rallye[question].point) {
      if (rallye.rallye[question].explication != "") {
        return (
          <View style={styles.main_container}>
            <ScrollView> 
                <View style={styles.header_container}>
                    <View style={styles.progressbar_container}>
                      <Text style={styles.progressbar_text}>Avancée du rallye : {avancee*100} %</Text>
                      <ProgressBar progress={avancee} style={styles.progressbar} color={'#2196F3'} />
                    </View>
                    <Text style={styles.title_text}>Bonne réponse !</Text>
                    <Text style={styles.title2_text}>
                      <Text style={styles.black_text}>Question : </Text>
                      {rallye.rallye[question].question}
                    </Text>
                    <Text style={styles.title2_text}>
                      <Text style={styles.black_text}>Bonne réponse : </Text>
                      {rallye.rallye[question].solution_text}
                    </Text>
                </View>
                <Text style={styles.texte}>
                  <Text style={styles.innerText}>Pour en savoir plus : </Text>
                  {rallye.rallye[question].explication}
                </Text>
                <View style={styles.Button}>
                  <Button type="clear" onPress={() => this.props.navigation.navigate(etape_suivante, {rallye, id_question_suivante, question_suivante, rallyes_reponse, score})} title="Continuer " />
                </View>
            </ScrollView> 
          </View>
        )
      }
      else {
        return (
          <View style={styles.main_container}>
            <ScrollView> 
                <View style={styles.header_container}>
                    <View style={styles.progressbar_container}>
                      <Text style={styles.progressbar_text}>Avancée du rallye : {avancee*100} %</Text>
                      <ProgressBar progress={avancee} style={styles.progressbar} color={'#2196F3'} />
                    </View>
                    <Text style={styles.title_text}>Bonne réponse !</Text>
                    <Text style={styles.title2_text}>
                      <Text style={styles.black_text}>Question : </Text>
                      {rallye.rallye[question].question}
                    </Text>
                    <Text style={styles.title2_text}>
                      <Text style={styles.black_text}>Bonne réponse : </Text>
                      {rallye.rallye[question].solution_text}
                    </Text>
                </View>
                <View style={styles.Button}>
                  <Button type="clear" onPress={() => this.props.navigation.navigate(etape_suivante, {rallye, id_question_suivante, question_suivante, rallyes_reponse, score})} title="Continuer " />
                </View>
            </ScrollView> 
          </View>
        )
      }
    }
    else {
      if (rallye.rallye[question].explication != "") {
        return (
          <View style={styles.main_container}>
            <ScrollView> 
                <View style={styles.header_container}>
                    <View style={styles.progressbar_container}>
                      <Text style={styles.progressbar_text}>Avancée du rallye : {avancee*100} %</Text>
                      <ProgressBar progress={avancee} style={styles.progressbar} color={'#2196F3'} />
                    </View>
                    <Text style={styles.title_text}>{text_erreur}</Text>
                    <Text style={styles.question_text}>Question : {rallye.rallye[question].question}</Text>
                    <Text style={styles.title2_text}>
                      <Text style={styles.black_text}>Réponse sélectionnée : </Text>
                      {rep}
                    </Text>
                    <Text style={styles.title2_text}>
                      <Text style={styles.black_text}>Bonne réponse : </Text>
                      {rallye.rallye[question].solution_text}
                    </Text>
                </View>
                <Text style={styles.texte}>
                  <Text style={styles.innerText}>Pour en savoir plus : </Text>
                  {rallye.rallye[question].explication}
                </Text>
                <View style={styles.Button}>
                  <Button type="clear" onPress={() => this.props.navigation.navigate(etape_suivante, {rallye, id_question_suivante, question_suivante, rallyes_reponse, score})} title="Continuer " />
                </View>
            </ScrollView> 
          </View>
        )
      }
      else {
        return (
          <View style={styles.main_container}>
            <ScrollView> 
                <View style={styles.header_container}>
                    <View style={styles.progressbar_container}>
                      <Text style={styles.progressbar_text}>Avancée du rallye : {avancee*100} %</Text>
                      <ProgressBar progress={avancee} style={styles.progressbar} color={'#2196F3'} />
                    </View>
                    <Text style={styles.title_text}>{text_erreur}</Text>
                    <Text style={styles.question_text}>Question : {rallye.rallye[question].question}</Text>
                    <Text style={styles.title2_text}>
                      <Text style={styles.black_text}>Réponse sélectionnée : </Text>
                      {rep}
                    </Text>
                    <Text style={styles.title2_text}>
                      <Text style={styles.black_text}>Bonne réponse : </Text>
                      {rallye.rallye[question].solution_text}
                    </Text>
                </View>
                <View style={styles.Button}>
                  <Button type="clear" onPress={() => this.props.navigation.navigate(etape_suivante, {rallye, id_question_suivante, question_suivante, rallyes_reponse, score})} title="Continuer " />
                </View>
            </ScrollView> 
          </View>
        )
      }
    } 
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
      marginTop: Constants.statusBarHeight*2,
      fontWeight: 'bold',
      fontSize: 38,
      textAlign: 'center'
  },
  title2_text: {
      marginTop: 20,
      fontSize: 24,
      textAlign: 'left'
  },
  black_text: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'left'
  },
  question_text: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'left'
  },   
  progressbar_container: {
    flex:1
  },
  progressbar_text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#2196F3'
  },
  progressbar: {
    flex:1,
    marginTop:5
  } 
})
