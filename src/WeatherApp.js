import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';
import Forcast from './Forcast';
import { apikey as AppId } from './secret';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30
    },
    backdrop: {
        flex: 1,
        flexDirection: 'column'
    },
    overlay: {
        paddingTop: 5,
        backgroundColor: '#000000',
        opacity: 0.5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        padding: 30
    },
    zipContainer: {
        flex: 1,
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        marginLeft: 5,
        marginTop: 3
    },
    zipCode: {
        width: 50,
        height: 16,
        color: '#FFFFFF'
    },
    mainText: {
        flex: 1,
        fontSize: 16,
        color: '#FFFFFF'
    }
});

export default class WeatherApp extends Component {
  constructor(){
      super(...arguments);
      this.state = {
          zip: '',
          forcast: null,
          error: ''
      }
  }
  
  handleInputChange(event) {
    let zip = event.nativeEvent.text;
    this.setState({ zip: zip });
     
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${zip}&units=imperial&appid=${AppId}`)
        .then((response) => response.json())
        .then((json) => {
            if(json.cod == "404") {this.setState({forcast: null, error: 'Not Found'})}
            else {
                let forcast = json.weather[0];
                let conditions = json.main;
                this.setState({
                    forcast: {
                        main: forcast.main,
                        description: forcast.desc,
                        temp: conditions.temp,
                        name: json.name,
                        country: json.sys.country
                    }, 
                    error: ''
                });
            }
        }).catch((err) => {
            this.setState({forcast: {}, error: 'Not Found'})
        });
  }
  
  render() {
    return (
        <View style={styles.container}>
            <Image 
                source={require('image!flowers')}
                resizeMode='cover'
                style={styles.backdrop}>
                    <View style={styles.overlay}>
                        <View style={styles.row}>
                            <Text style={styles.welcome}>Your zip address is {this.state.zip}</Text>
                            <View style={styles.zipContainer}>
                                <TextInput 
                                    style={[styles.zipCode, styles.zipContainer]}
                                    returnKeyType='go'
                                    keyboardType='numeric'
                                    onSubmitEditing={this.handleInputChange.bind(this)}/>
                            </View>
                        </View>    
                        <Forcast data={this.state.forcast} error={this.state.error}/>
                    </View>
            </Image>        
        </View>
    );
  }
}
