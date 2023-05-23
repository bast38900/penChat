import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackNavigatorParamList>;
  App: NavigatorScreenParams<AppStackNavigatorParamList>;
};

export type AppStackNavigatorParamList = {
  ChatRoom: undefined;
};

export type AuthStackNavigatorParamList = {
  SignIn: undefined;
};