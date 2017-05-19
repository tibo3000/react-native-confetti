# react-native-confetti

Celebrative UI for your app 🎉🎉🎉

Inspired by dom-confetti (https://github.com/daniel-lundin/dom-confetti)

## Installation

Download Confetti.js and import it in whatever JS file you want.
```javascript
// Assuming Confetti.js is in the same folder as the file you're writing this in:
import Confetti from './Confetti'
```

## Usage

Set it up with a ref and a colors prop

```jsx
<Confetti ref={(ref) => this._confetti = ref} colors={['#a864fd','#29cdff','#78ff44']} />
```

Shoot the confettis!
```javascript
let config = {
  angle : 90,
  decay : 0.9,
  spread : 40,
  startVelocity : 20,
  elementCount : 20
}

this._confetti.start(config).then(() => alert("Party's over..."))
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request ✌️

## Credits

Thanks to Daniel Lundin for its awesome dom-confetti

https://github.com/daniel-lundin/
https://github.com/daniel-lundin/dom-confetti

## License

MIT License
