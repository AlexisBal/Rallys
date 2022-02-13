import React from 'react';
import { Text, View } from '../components/Themed';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

export interface Props {
  rallye: {
    id: number
    nom: string
    photo1: object
    title: string
    distance: string
    description: string
  } 
  displayDetailRallye: Function
}

export class RallyeItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    const { rallye, displayDetailRallye } = this.props
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => {
         displayDetailRallye(rallye.id)}}>
        <Image
          style={styles.image}
          source={rallye.photo1}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{rallye.title}</Text>
          </View>
          <View style={styles.info_container}>
            <Text style={styles.date_text}>Distance : {rallye.distance}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20, 
  },
  image: {
    width: 90,
    height: 120
  },
  content_container: {
    flex: 1,
    marginLeft: 10,
  },
  header_container: {
    flex: 1,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 21,
  },
  info_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'left',
    fontSize: 19,
  }
})
