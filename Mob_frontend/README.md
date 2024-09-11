# Blogs App

## installation

```bash

# install required packages
> npm install  react-native-safe-area-context react-native-vector-icons @react-navigation/native  react-native-screens @react-navigation/bottom-tabs @react-navigation/native-stack react-native-paper @react-native-picker/picker moment

# react-native-safe-area-context: used to keep the safe area intact
# react-native-vector-icons: used to add the vector (which can be stretched as per screen resolution)
# @react-navigation/native: used to add navigation amongst the components
# react-native-screens: dependency of react navigation
# @react-navigation/bottom-tabs: used to add the bottom tab navigation
# @react-navigation/native-stack: used to add the stack navigation
# react-native-paper: used to add react native paper framework
# @react-native-picker/picker: used to add picker (spinner) to select existing option
# moment: used to add data processing
# expo-camera: used to add camera support

```

## require VS extensions

- https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag
- https://marketplace.visualstudio.com/items?itemName=NuclleaR.vscode-extension-auto-import
- https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag
- https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker
- https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets

## important points

```javascript
// the function will be called only first time
// when the component gets loaded
useEffect(() => {
  console.log('test')
}, [])

// the function (where console is written) will be called only once
// when the component gets unloaded
useEffect(() => {
  return () => {
    console.log('test')
  }
}, [])

// the function will be called all the times when
// the component's state changes
useEffect(() => {})
```
