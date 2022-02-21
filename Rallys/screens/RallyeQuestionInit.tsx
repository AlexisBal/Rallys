import React from 'react'
import { Text, View } from '../components/Themed';
import { StyleSheet, Image, ScrollView, ActivityIndicator, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type Props = StackScreenProps<RootStackParamList, 'RallyeQuestionInit'>;

export class RallyeQuestionInit extends React.Component<Props> {
  ref: React.RefObject<unknown>;
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
      displayImage: 'flex',
      isLoading: true
    };
    this.ref = React.createRef();
    // Image 
    if (!this.props.route.params.rallye.rallye.question1.photo) {
      this.state.displayImage = 'none';
    }
  }

  // Popup
  Notif() {
    Alert.alert(
      "Trop de réponses sélectionnées !",
      "Appuie sur les réponses sélectionnées pour modifier ton choix.",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Réinitialiser mon choix",
          onPress: () => this.setState({
            backgroundColor1: '#2196F3',
            backgroundColor2: '#2196F3',
            backgroundColor3: '#2196F3',
            backgroundColor4: '#2196F3',
            backgroundColor5: '#2196F3',
            backgroundColor6: '#2196F3',
            backgroundColor7: '#2196F3',
            nombre_reponses: 0,
            display: 'none'
          }),
        },
      ],
      { cancelable: false }
    );
  }

  // Changement de couleur pressé
  ChangeColor(rep:string, boutonId:any){
      if (this.state["backgroundColor"+boutonId] == '#2196F3') {
        if (this.state.nombre_reponses < this.props.route.params.rallye.rallye.question1.point) {
          var reponses = this.state.nombre_reponses + 1
          if (reponses == this.props.route.params.rallye.rallye.question1.point) {
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
        } else {
          this.Notif()
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
  
  // Synchronisation de l'écran 
  render() {
    // Id Question actuelle 
    const id_question = 1;
    // Initialisation du score
    const score = 0;
    // Dictionnaire 'rallye' 
    const rallye = this.props.route.params.rallye
    // Gestion affichage des boutons 
    const nombre_propositions = rallye.rallye.question1.nombre_reponses;
    const proposititionItemsValue = ["A", "B", "C", "D", "E", "F", "G"];
    const proposititionItems = [];
    for (var i=1; i < nombre_propositions+1; i++) { 
      proposititionItems.push(
        [
          rallye.rallye["question1"]["reponse"+i],
          proposititionItemsValue[i-1],
          i
        ]
      );
    }
    // Sauvegarde du rallye
    var rallyes_reponse = {
    };
    var reponse = []
    for (var x=0; x<7; x++) {
      if (this.state["rallyes_reponse"+x] != '') {
        reponse.push(this.state["rallyes_reponse"+x]);
      }
    };
    rallyes_reponse['question1'] = reponse;
    const colors = ["#E7DCFE", "#FEE8DC", "#FEDEDF", "#DCF3FE", "#BBEED9", "#FEDCFA", "white"]
    // Affichage
    return (
      <View style={{flex:1, flexDirection: "column"}}>
        <ScrollView ref={this.ref} contentContainerStyle={{flexGrow: 1}} onContentSizeChange={() => this.ref.current.scrollToEnd({ animated: true })}>
          <View style={{flex:1, paddingBottom:0}}>
            <View style={{flex:1, paddingBottom:15, paddingTop:15, margin:15, borderRadius: 30, backgroundColor: colors[3]}}>
              <View style={{alignItems: 'center', justifyContent:'center', borderRadius: 30, backgroundColor: colors[3]}}>
                { this.state.isLoading ?
                  <View style={styles.loading_container}>
                      <ActivityIndicator size='large' />
                  </View>
                  : null
                }
                <Image
                  key={rallye.rallye.question1.photo}
                  style={{ marginTop: 15, paddingLeft: 20, paddingRight: 20, width: 330, height: 190, alignSelf: 'center', display: this.state.displayImage, resizeMode: "contain"}}
                  source={{uri: "https://ipfs.io/ipfs/"+rallye.rallye.question1.photo}}
                  onLoadEnd={() => this.setState({isLoading: false})}
                />
                <Text style={styles.texte}>
                  {rallye.rallye.question1.enonce}
                  <Text style={styles.innerText}>{rallye.rallye.question1.question}</Text>
                </Text>
              </View>
            </View>
            <View style={{flex:2, marginLeft: 15, marginRight: 15, borderRadius: 30, marginBottom:20, justifyContent: 'center', backgroundColor: colors[4]}}>
              <View style={{justifyContent: 'center', flexDirection: "row", flexWrap: "wrap", marginTop:20, marginBottom:20, borderRadius: 30, backgroundColor: colors[4]}}>
                {proposititionItems.map((propositition) =>
                  <View style={{ padding:10, minWidth:"40%", backgroundColor: colors[4]}} key={propositition[0].toString()}>
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
          <View style={{display: this.state.display, width:"100%", padding: 30 }}>
            <Button 
              buttonStyle={{height:60, backgroundColor: '#054AAD'}} 
              containerStyle={{  width:"100%", borderRadius: 50}} 
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
      alignSelf: 'center',
    },
    main_container: {
      flex: 1,
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
      marginBottom: 15,
    },
})


