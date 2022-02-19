import React from 'react'
import { Text, View } from '../components/Themed';
import { StyleSheet, Image, ScrollView, ActivityIndicator} from 'react-native';
import { Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type Props = StackScreenProps<RootStackParamList, 'RallyeQuestion'>;

export class RallyeQuestion extends React.Component<Props> {
  ref: React.RefObject<unknown>;
  question: any;
  // Constructeur de l'objet 
  constructor(props: Props) {
    super(props)
    this.state = {
      backgroundColor1: '#2196F3',
      backgroundColor2: '#2196F3',
      backgroundColor3: '#2196F3',
      backgroundColor4: '#2196F3',
      backgroundColor5: '#2196F3',
      backgroundColor6: '#2196F3',
      backgroundColor7: '#2196F3',
      nombre_reponses: 0,
      rallyes_reponse1: '',
      rallyes_reponse2: '',
      rallyes_reponse3: '',
      rallyes_reponse4: '',
      rallyes_reponse5: '',
      rallyes_reponse6: '',
      rallyes_reponse7: '',
      display: 'none',
      isLoading: true,
      displayImage: "flex"
    };
    this.ref = React.createRef();
  }

  // Méthode reset de la page 
  resetForm = () => {
    this.setState({
      backgroundColor1: '#2196F3',
      backgroundColor2: '#2196F3',
      backgroundColor3: '#2196F3',
      backgroundColor4: '#2196F3',
      backgroundColor5: '#2196F3',
      backgroundColor6: '#2196F3',
      backgroundColor7: '#2196F3',
      nombre_reponses: 0,
      rallyes_reponse1: '',
      rallyes_reponse2: '',
      rallyes_reponse3: '',
      rallyes_reponse4: '',
      rallyes_reponse5: '',
      rallyes_reponse6: '',
      rallyes_reponse7: '',
      display: 'none',
      isLoading: true,
      displayImage: "flex"
    });
  }


  // Changement de couleur pressé
  ChangeColor(rep:string, boutonId:any){
    if (this.state["backgroundColor"+boutonId] == '#2196F3') {
      if (this.state.nombre_reponses < this.props.route.params.rallye.rallye[this.props.route.params.question_suivante].point) {
        var reponses = this.state.nombre_reponses + 1
        if (reponses == this.props.route.params.rallye.rallye[this.props.route.params.question_suivante].point) {
          this.state["backgroundColor"+boutonId] = 'black';
          this.state["rallyes_reponse"+boutonId] = rep;
          this.setState({
            nombre_reponses: reponses,
            display: 'true'
          })
        }
        else {
          this.state["backgroundColor"+boutonId] = 'black';
          this.state["rallyes_reponse"+boutonId] = rep;
          this.setState({
            nombre_reponses: reponses,
            display: 'none'
          }) 
        }
      }
    }
    else {
      var reponses = this.state.nombre_reponses - 1
      this.state["backgroundColor"+boutonId] = "#2196F3";
      this.state["rallyes_reponse"+boutonId] = "";
      this.setState({
        nombre_reponses: reponses,
        display: 'none'
      }) 
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.route.params.id_question_suivante !== this.props.route.params.id_question_suivante) {
      this.resetForm();
      if (!this.props.route.params.rallye.rallye[this.props.route.params.question_suivante].photo) {
        this.setState({isLoading: false, displayImage: "none"});
      }
    }
  }


  render() {
    // Fichier JSON
    const rallye = this.props.route.params.rallye;
    // Question actuelle 
    const question = this.props.route.params.question_suivante;
    // Numéro de la question actuelle 
    const id_question = this.props.route.params.id_question_suivante;
    // Score
    const score = this.props.route.params.score;
    // Gestion affichage des boutons 
    const nombre_propositions = this.props.route.params.rallye.rallye[question].nombre_reponses
    const proposititionItemsValue = ["A", "B", "C", "D", "E", "F", "G"];
    const proposititionItems = [];
    for (var i=1; i < nombre_propositions+1; i++) { 
      proposititionItems.push(
        [
          rallye.rallye[question]["reponse"+i],
          proposititionItemsValue[i-1],
          i
        ]
      );
    }
    // Sauvegarde du rallye
    var rallyes_reponse = this.props.route.params.rallyes_reponse;
    var reponse = [];
    for (var x=0; x<7; x++) {
      if (this.state["rallyes_reponse"+x] != '') {
        reponse.push(this.state["rallyes_reponse"+x]);
      }
    };
    rallyes_reponse[question] = reponse;

    return (
      <View style={{flex:1, flexDirection: "column"}}>
        <ScrollView ref={this.ref} contentContainerStyle={{flexGrow: 1}} onContentSizeChange={() => this.ref.current.scrollToEnd({ animated: true })}>
          <View style={{flex:1, backgroundColor:"#eeeeee", paddingBottom:0}}>
            <View style={{flex:1, backgroundColor: "#a8e6cf", paddingBottom:15, paddingTop:15, margin:15, borderRadius: 30}}>
              <View style={{alignItems: 'center', justifyContent:'center', backgroundColor: "#a8e6cf", borderRadius: 30 }}>
                <Image
                  key={rallye.rallye[question].photo}
                  style={{ marginTop: 15, paddingLeft: 20, paddingRight: 20, width: 330, height: 190, alignSelf: 'center', display: this.state.displayImage, resizeMode: "contain"}}
                  source={{uri: "https://ipfs.io/ipfs/"+rallye.rallye[question].photo}}
                  onLoadEnd={() => this.setState({isLoading:false})}
                />
                { this.state.isLoading ?
                  <View style={styles.loading_container}>
                      <ActivityIndicator size='large' />
                  </View>
                  : null
                }
                <Text style={styles.texte}>
                  {rallye.rallye[question].enonce}
                  <Text style={styles.innerText}>{rallye.rallye[question].question}</Text>
                </Text>
              </View>
            </View>
            <View style={{flex:2, marginLeft: 15, marginRight: 15, borderRadius: 30, marginBottom:20, justifyContent: 'center'}}>
              <View style={styles.container}>
                {proposititionItems.map((propositition) =>
                  <View style={{ padding:10, minWidth:"40%"}} key={propositition[0].toString()}>
                  <Button 
                    buttonStyle={{ borderRadius: 30, height: 50, backgroundColor: this.state["backgroundColor"+propositition[2]]}}
                    titleStyle={{fontSize: 20, padding: 20}} 
                    title={propositition[0]} 
                    onPress={() => { this.ChangeColor(propositition[1], propositition[2]) }}
                  />
                </View>
                )}
              </View>
            </View>
          </View>
          <View style={{display: this.state.display, width:"100%", backgroundColor:"#eeeeee", justifyContent: 'center'}}>
            <Button 
              buttonStyle={{height:70, borderRadius: 0, backgroundColor: '#054AAD'}} 
              containerStyle={{ borderRadius: 0, width:"100%"}} 
              title="CONFIRMER"  
              onPress={() => {
                this.state.displayImage = 'none',
                this.props.navigation.navigate('ReponseScreen', {rallye, id_question, rallyes_reponse, score});
              }}
            />
          </View>
        </ScrollView>
      </View>
    )
  }  
}

const styles = StyleSheet.create({
    loading_container: {
      marginTop: 50,
      alignSelf: 'center',
    },
    main_container: {
      flex: 1,
    },
    container: {
      flex:1,
      justifyContent: 'center',
      flexDirection: "row",
      flexWrap: "wrap",
      paddingTop:20,
      paddingBottom:20,
      borderRadius: 30
    },
    innerText:{
      flex:1,
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 15,
      fontSize: 21,
      textAlign: 'left',
      fontWeight: 'bold',
    },
    texte: {
      flex:1,
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 15,
      fontSize: 21,
      textAlign: 'left',
    },
})

