### penChat

This is the code for a new Real Time Chat App, based on “Deployment Task” from Pentia Odense

- Documentation will follow, the rest is within the code (functions etc.)

Resources used:

- https://rnfirebase.io/
- https://yarnpkg.com/package/react-native-splash-screen
- https://reactnavigation.org/docs/typescript/
- https://github.com/FaridSafi/react-native-gifted-chat

# Tasklist:

- Splash screen: Done 100%
- Login screen: Done 100%
- Chat rooms: Description only implemented as hardcoded, No sorting on new messages, No chevron icon
- Open chat room: Upload Picture not implemented due to missing ressources
- Send and receive messages: Done 100%
- Push functionality: Not implemented due to missing ressources

# Effort:

Worktime: 5 1/2 days = 44 Hours

# Whats included?

- React Native Framework
  - TypeScript Language
- FireBase Cloud Services
  - Social Authentication (Google, Facebook)
  - Firestore noSQL Database

# Dependencies

```
Firestore:
"@react-native-firebase/app": "^17.5.0",
"@react-native-firebase/auth": "^17.5.0",
"@react-native-firebase/firestore": "^17.5.0",

Social Authentication:
"@react-native-google-signin/google-signin": "^9.0.2",
"react-native-fbsdk-next": "^11.2.1",

Navigation:
"@react-navigation/native": "^6.1.6",
"@react-navigation/stack": "^6.3.16",
"react-native-screens": "^3.20.0",

React&ReactNative:
"react": "18.2.0",
"react-native": "0.71.8",
"react-native-gesture-handler": "^2.10.0",

UIAndElements:
"react-native-gifted-chat": "^2.1.0",
"react-native-paper": "^5.8.0",
"react-native-safe-area-context": "^4.5.2",
"react-native-splash-screen": "^3.3.0",
"react-native-vector-icons": "^9.2.0"
```

# NavigationFlow

```
<RootNavigator>
	<AuthStackNavigator>
		{SignUpScreen}
	<AppStackNavigator>
		{HomeScreen}
			{AddRoomScreen}
			{ChatRoomScreen}
```

# Recommended future improvements

- Context file, with provider, updated with functions.
- SplashScreen improvement to tsx. File
- TypeScript improvements on messages, and user etc. within the screens in the app
- Chancing from <GiftedChat/> elements, to self coded components for uniqueness of the design.

### Setup, run and deploy

# 1. Setup

```
Clone the project and install dependencies.
```

```
Remove .git file to make sure we don't make any commits or changes to the repository
$ rm -rf .git
```

```
Add yarn as package manager, and install pod for ios package handling
$ yarn
$ bundle install
$ npx pod-install
```

# 2. Run

```
$ npx react-native start
$ npx react-native run-ios
$ npx react-native run-android
```
		
# OBS - Facebook login is enabled, but login is unavailable until the app, has been reviewed by Facebook

### Questions?

All questions is sent to mail: bast38900@edu.ucl.dk
