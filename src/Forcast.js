import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

var styles = StyleSheet.create({
    bigText: {
        flex: 2,
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#FFFFFF'
    },
    mainText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: '#FFFFFF'
    }
})

export default class Forcast extends Component {

    constructor(){
        super(...arguments);
    }

    render() {
        let forcast = this.props.data;
        let error = this.props.error;

        return (error == '' && forcast != null) ? (
            <View>
                <Text style={styles.bigText}>Forcast for {forcast.name}, {forcast.country}{'\n'}</Text>

                <Text style={styles.bigText}>
                    {forcast.main}
                </Text>
                <Text style={styles.mainText}>
                    Current Conditions: {forcast.description}
                </Text>
                <Text style={styles.bigText}>
                    {forcast.temp}°F
                </Text>
            </View>
        ) : (
            <View>
                <Text style={styles.bigText}>{error}</Text>
            </View>
        );
    }
}
Forcast.defaultProps = {
    data: null,
    error: ''
}
