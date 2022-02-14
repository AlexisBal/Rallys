import React from 'react'
import { Text, View } from '../components/Themed';
import { StyleSheet, Image, ScrollView, Button, ActivityIndicator } from 'react-native';
import { getRallyeData } from '../Helpers/RallyesData';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Constants from 'expo-constants';

type Props = StackScreenProps<RootStackParamList, 'AccueilRallye'>;

export class AccueilRallye extends React.Component<Props> {
  constructor(props: Props) {
    super(props),
    this.state = {
      rallye: {},
      isLoading: false
    }
  }
  
  _loadRallye() {
    getRallyeData().then(data => {
      this.setState({ rallye: data.results })
    })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
          {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
        </View>
      )
    }
  }
  
  render() {
    const rallye = this.props.route.params.rallye;
    return (
      <View style={styles.main_container}>
        <ScrollView>
          <View style={styles.main_container_2}>
            {this._displayLoading()}
            <Image
              style={styles.image}
              source={{uri: "https://ipfs.io/ipfs/"+rallye.photo1}}
              onLoadStart={() => this.setState({loading: true})}
              onLoadEnd={() => this.setState({loading: false})}
            />
            <View style={styles.content_container}>
              <View style={styles.header_container}>
                <Text style={styles.title_text}>{rallye.title}</Text>
              </View>
              <View style={styles.description_container}>
                <Text style={styles.date_text}>Durée : {rallye.duree}</Text>
                <View style={styles.button}>
                   <Button title="Passer la partie Histoire" onPress={() => {this.props.navigation.navigate("Regles", { rallye })}}/>
                </View>
                <View style={styles.description_container_bis}> 
                  <Text style={styles.description_text}>{rallye.description}</Text>
                </View>
              </View>
            </View>
            <View style={styles.button}>
                <Button title='Voir les règles du jeu' onPress={() => {this.props.navigation.navigate("Regles", { rallye })}}/>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }  
}

const styles = StyleSheet.create({
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  main_container: {
    flex: 1,
    paddingBottom: Constants.statusBarHeight,
  },
  main_container_2: {
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 200,
    alignSelf: 'center'
  },
  container: {
    marginTop: 30,
    flex:1
  },
  content_container: {
    flex: 1,
    marginTop: 20
  },
  header_container: {
    flex: 1
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center'
  },
  description_container: {
    flex: 6,
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  description_container_bis: {
    flex: 1,
    marginTop: 15,
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    fontSize: 17,
  },
  button: {
    marginTop: 10,
    flex:1,
  },
  date_text: {
    textAlign: 'left',
    fontSize: 18
  }
})

