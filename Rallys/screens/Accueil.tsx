import React from 'react'
import { Text, View } from '../components/Themed';
import { StyleSheet, ActivityIndicator, Image } from 'react-native'
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
    return (
      <View style={styles.main_container}>
        <Image
            style={{flex:1, alignSelf: 'center', resizeMode: "contain"}}
            source={require("../assets/images/logo.png")}
        />
        <View style={styles.container}>
          <Button 
              type="outline"
              buttonStyle={styles.button}
              title="Commencer"
              titleStyle={styles.textInput}
              containerStyle={styles.textInputContainer}
              onPress={() => {this.props.navigation.navigate("AccueilRallye", {rallye})}}
            />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: Constants.statusBarHeight*2
  },
  button:{
    backgroundColor: '#054AAD',
    height: 55,
    borderRadius: 30,
    marginLeft: 20,
    marginRight: 20,

  },
  Searchcontainer: {
    flex: 1,
  },
  textInputContainer: {
    height: 55,
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontSize: 20,
  },
  container: {
    flex:1,
    justifyContent: "flex-end"
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
