import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header';
import styles from '../../../styles';
import { Searchbar } from 'react-native-paper';
import { Card, Divider } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons';
import BarList, { BarListItem } from '../../../components/BarList';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, logoutUser } from '../../../stores/userReducer';
import { serverUrl, userLogoutCall } from '../../../utils/apiCalls';
import { User } from '../../../utils/types';

export default function SettingsScreen(
  { navigation, participant }: 
  { navigation: any, participant: boolean} ) {
    
  const user = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  
  const [search, setSearch] = useState<string>('');
  const updateSearch: (text: string) => void = (search: string) => {
    setSearch(search);
  };

  const toProfile = () => {
    navigation.navigate('MainProfile')
  }

  const toPushNotifs = () => {
    navigation.navigate('PushNotifs')
  }

  const toEditProfile = () => {
    navigation.navigate('EditProfile')
  }

  const switchTabs = () => {
    if (participant) {
      if (user?.researcher) {
        navigation.navigate('ResearcherTabs', {screen: 'Studies'})
      } else {
        navigation.navigate('ResearcherAuth')
      }
    } else {
      navigation.navigate('ParticipantTabs', {screen: 'Explore'})
    }
  }

  const getSwitchTitle = () => {
    if (participant) {
      return 'Switch to Researcher Profile'
    } else {
      return 'Switch to Participant Profile'
    }
  }

  const toPrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy')
  }

  const toTermsOfService = () => {
    navigation.navigate('TermsOfService')
  }

  const signOut = async () => {
    dispatch(logoutUser());
    const response = await userLogoutCall();
    if (response !== null) {
      navigation.navigate('Auth');
    } else {
      alert('Something went wrong. Please try again.')
      console.log(response);
      return;
    }
  }

  const data: BarListItem[] = [
    {
        title: 'Push Notifications',
        onPress: toPushNotifs
    },
    {
        title: 'Edit Profile',
        onPress: toEditProfile
    },
    {
        title: getSwitchTitle(),
        onPress: switchTabs
    },
    {
        title: 'Privacy Policy',
        onPress: toPrivacyPolicy
    },
    {
        title: 'Terms of Service',
        onPress: toTermsOfService
    },
    {
        title: 'Sign Out',
        onPress: signOut
    }
  ];

  return (
    <View style={{width: '100%', flex: 1}}>
      <View style={{width: '100%', paddingTop: 24, paddingBottom: 8, paddingHorizontal: 16, backgroundColor: '#195064'}}>
        <Header
          title='Settings'
          leftComponentType='touchable-text' leftText='Back' onLeftPress={toProfile}
          textColor='white'
          backgroundColor='#195064'/> 
      </View>

      <View style={styles.container}>
        <ScrollView style={{flex: 1, width: '100%'}}>
          <Searchbar
            placeholder="Search"
            onChangeText={updateSearch}
            value={search}
            style={styles.searchbar}
          />
          <BarList data={data} type='buttons'/>
        </ScrollView>
      </View>
    </View>
    
  )
}