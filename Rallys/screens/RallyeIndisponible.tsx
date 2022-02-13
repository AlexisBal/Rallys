import React from 'react'
import { Text, View } from '../components/Themed';
import { StyleSheet, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Rallyes from '../Helpers/RallyesData';
import { RallyeItemBis } from '../components/RallyeItemBis';


type Props = StackScreenProps<RootStackParamList, 'RallyeIndisponible'>;

export class RallyeIndisponible extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  // Navigation vers AccueilRallye
  _displayDetailRallye = (id:number) => {
    this.props.navigation.navigate("AccueilRallye", { id })
  }

  render() {
    const rallye = Rallyes; // Base de données 
    const list_rallye = [rallye[0], rallye[1], rallye[2]];
    return (
      <View style={styles.main_container}>
        <Text style={styles.titre}>
          Oups, pas encore de rallyes à proximité ! 
        </Text>
        <Text style={styles.titre2}>
          Quelques rallyes à découvrir 
        </Text>
        <FlatList
            style={styles.container}
            data={list_rallye}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <RallyeItemBis rallye={item} displayDetailRallye={this._displayDetailRallye}
            />}
            onEndReachedThreshold={0.5}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignContent: 'center',
  },
  container: {
    marginTop: 10,
    flex:1, 
  },
  titre: {
    marginTop: 18,
    fontSize: 34,
    marginLeft: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  titre2: {
    marginTop: 20,
    fontSize: 25,
    marginLeft: 20,
    marginRight: 20
  }
})

