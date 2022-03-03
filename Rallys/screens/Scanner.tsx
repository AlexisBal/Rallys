import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

import { getRallyeData } from '../Helpers/RallyesData';
import Constants from 'expo-constants';

type Props = StackScreenProps<RootStackParamList, 'Scanner'>;

export class Scanner extends React.Component<Props> {
    constructor(props: Props) {
      super(props),
      this.state = {
        hasPermission: null,
        scanned: false
      }
    }

    async componentDidMount(){
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        this.setState({hasPermission: status === 'granted'});
    }

    handleScanned(url: string) {
        this.setState({scanned: true});
        getRallyeData(url).then(rallye => {
            this.props.navigation.navigate("AccueilRallye", {rallye})
        });
       
    };

    render() {
        return (
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={({data}) => this.handleScanned(data)}
                    style={StyleSheet.absoluteFillObject}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Scanner un QR Code</Text>
                </View>
            </View>
        )
    }
}
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    textContainer: {
        marginTop:  3*Constants.statusBarHeight,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: "black",
        borderRadius: 10,
        opacity: 0.7,
    },
    text: {
        fontSize:18,
        color: "white",
        padding: 10,
        borderRadius: 65
    }
  });
  