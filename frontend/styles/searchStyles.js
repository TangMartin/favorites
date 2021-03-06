import { Row } from 'native-base';
import {StyleSheet} from 'react-native';
import { greaterThan } from 'react-native-reanimated';

export default StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        marginLeft: "5%",
      },
      textInputContainer: {
        flexDirection: 'row',
      },
      textInput: {
        backgroundColor: '#FFFFFF',
        height: 44,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 20,
        fontSize: 15,
        color: '#000000',
        flex: 1,
      },
      mainContainer: {
        width: "100%",
        height: '100%',
        paddingHorizontal:'6%',
      },
      headerimage: {
        width:'100%',
        height: '65%',
        marginVertical: '4%',

      },
      headertitle: {
        fontSize: 26,
        fontWeight: 'bold',
      },
      typeandreview: {
          flexDirection: 'row',
          paddingTop: 10,
          marginLeft: 2,
          width: '80%',
      },
      type: {
        fontSize: 16,
        marginRight: 4,

      }
});