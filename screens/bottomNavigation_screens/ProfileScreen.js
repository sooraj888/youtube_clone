import React from 'react';
import {Button, Text, View} from 'react-native';
import {ThemeContext} from '../../App';

function ProfileScreen({navigation}) {
  const {setTheme, theme} = React.useContext(ThemeContext);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: theme === 'Light' ? 'black' : 'white'}}>
        Profile Screen
      </Text>
      <Button
        title="Switch Theme"
        onPress={() => setTheme(theme === 'Light' ? 'Dark' : 'Light')}
      />
    </View>
  );
}

export default ProfileScreen;
