import React from 'react'
import { Text, View } from '../components/Themed';
import { StyleSheet, ActivityIndicator } from 'react-native'
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getRallyeData } from '../Helpers/RallyesData';


type Props = StackScreenProps<RootStackParamList, 'Accueil'>;

export class Accueil extends React.Component<Props> {
  constructor(props: Props) {
    super(props),
    this.state = {
      rallye: {},
      isLoading: false
    }
  }

  componentDidMount() {
    getRallyeData().then(response => {
      this.setState({ rallye: response })
    })
  }

  render() {
    var rallye = this.state.rallye;
    console.log(rallye);
    return (
      <View style={styles.main_container}>
        <Text style={styles.titre}>
            Bienvenue sur Rallys, l'application qui permet de découvrir tout en marchant, les plus beaux sites et villages français !
        </Text>
        <View style={styles.container}>
            <Text style={styles.titre2}>
                  Chercher un rallye
            </Text>
            <View style={styles.Searchcontainer}>
              <Button
                icon={
                  <Icon
                    name="search"
                    size={18}
                    color="#959595"
                    style={{marginLeft:10}}
                  />
                }
                buttonStyle={styles.button}
                containerStyle={styles.textInputContainer}
                title="Saisir une ville à proximité"
                titleStyle={styles.textInput}
                onPress={() => {this.props.navigation.navigate("AccueilRallye", {rallye})}}
              />
            </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  button:{
    backgroundColor: '#F1F1F1',
    height: 55,
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10

  },
  Searchcontainer: {
    marginTop: 20,
    flex: 1
  },
  textInputContainer: {
    flex:1,
    height: 55,
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10
  },
  textInput: {
    flex: 1,
    textAlign: 'left',
    color: '#959595',
    marginLeft: 15,
    fontSize: 19,
  },
  container: {
    marginTop: 10,
    flex:1
  },
  texte: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 18,

  },
  titre: {
    marginLeft: 20,
    marginRight: 10,
    marginTop: 10,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'left'

  },
  titre2: {
    marginTop: 8,
    fontSize: 25,
    marginLeft: 20,
    marginRight: 20
  }
})
