import {StyleSheet} from 'react-native';

export default StyleSheet.create(
{
    headercontainer: {
        paddingVertical: '4%',
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        flex:0,
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
          },
        shadowOpacity: 0.36,
    },
});