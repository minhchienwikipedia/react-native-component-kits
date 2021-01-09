
# react-native-component-kits
[![npm version](https://badge.fury.io/js/react-native-component-kits.svg)](https://badge.fury.io/js/react-native-component-kits) ![](https://img.shields.io/github/issues/minhchienwikipedia/react-native-component-kits.svg) ![](https://img.shields.io/github/stars/minhchienwikipedia/react-native-component-kits.svg) ![](https://img.shields.io/github/license/minhchienwikipedia/react-native-component-kits.svg) [![npm](https://img.shields.io/npm/dm/react-native-component-kits.svg)](https://npmjs.com/package/react-native-component-kits)

[![NPM](https://nodei.co/npm/react-native-component-kits.png?downloads=true&stars=true)](https://nodei.co/npm/react-native-component-kits/)

## Getting started

`$ npm install react-native-component-kits --save`

- OR

`$ yarn add react-native-component-kits`

## Descriptions

This library will help you improve your code, faster and easier.

#### Components

**`ViewVisibleAnimated`**
```javascript
<ViewVisibleAnimated >
    <Text>Hello</Text>
</ViewVisibleAnimated> 
```
- `Props`

```typescript
type ViewVisibleAnimatedProps = {
    scaleEnable?: Boolean,
    autoHide?: Boolean,
    onShowDone?: void,
    onDone?: void,
    onShowStart?: void,
    style?: StyleProp<ViewStyle>,
    delay?: Number,
    duration?: Number,
    timeout?: Number,
    autoShow?: Boolean,
    pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto',
    scaleType?: 'in' | 'out',
    renderHiddenContent?: any // Content show when component hide, default null
};
```

- `Method`
```javascript
show(callback, isDelay)

hide(callback)
```
------

**`ScaleButton`**
```javascript
<ScaleButton onPress={()=>{}}>
    <Text>Hello</Text>
</ScaleButton> 
```
- `Props`

```typescript
type TouchableWithoutFeedbackProps
```


--------

#### Functions

| Functions | Description | Type |
|---|---|---|
|**`memoDeepEqual`**|Using `memo` of React but deep compare preProps with nextProps to check component should be return `true` or `false`.|`Higher Order Function`|
|**`memoWithRef`**|It's like `memoDeepEqual` but using `forwardRef` to get `ref` of component.|`Higher Order Function`|
|**`useStateCallback`**|Using `useState` of React and handle to get callback after setState|`Hook`|
|**`detectEmail`**|Check string is email|`Boolean`|
|**`detectUserName`**|Check string is user name|`Boolean`|
|**`detectPhoneNumber`**|Check string is user phone number|`Boolean`|
|**`withAnimated`**|Convert class component to use Animated|`Function`|

#### Hooks

| Functions | Description | Type |
|---|---|---|
|**`useCountdown`**|Countdown value. Params: `startDate, endDate, autoStart,intervalTime`|`Hooks`|
|**`useInterval`**|Countdown value. Params: `callback, delay, autoStart`|`Hooks`|
|**`useFetchData`**|Countdown value. Params: `api,loadingDefault, pathData`|`Hooks`|

### How to use

**`memoDeepEqual`**
```javascript
const App = ()=>{
    return <Text>Hello</Text>
}
export default memoDeepEqual(App) 

// OR

const App = memoDeepEqual(()=>{
    return <Text>Hello</Text>
})

export default App
```

**`memoWithRef`**
```javascript
const App = (props, ref)=>{
    const updateValue = (value)=>{
        console.log(value)
    }

    useImperativeHandle(
        ref,
        () => ({
            updateValue  
        }),
        [],
    )
    return <Text>Hello</Text>
}
export default memoWithRef(App) 
```

**`useStateCallback`**
```javascript
const [state, setState] = useStateCallback(initialState)

setState('123',(nextState)=>{
    console.log(nextState)
})
```


---

## License

This module is [MIT licensed](./LICENSE)

---
