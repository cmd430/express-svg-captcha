# express-svg-captcha

## Example use:
```js
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const expressCaptcha = require('express-svg-captcha')

const app = express()
const captcha = new expressCaptcha({
  isMath: true,           // if true will be a simple math equation
  useFont: null,          // Can be path to ttf/otf font file
  size: 4,                // number of characters for string capthca
  ignoreChars: '0o1i',    // characters to not include in string capthca
  noise: 3,               // number of noise lines
  color: true,            // if true noise lines and captcha characters will be randomly colored
                          // (is set to true if background is set)
  background: null,       // HEX or RGB(a) value for background set to null for transparent
  width: 150,             // width of captcha
  height: 50,             // height of captcha
  fontSize: 56,           // font size for captcha
  charPreset: null,       // string of characters for use with string captcha set to null for default aA-zZ
})

app.use(session({
  secret: 'your secret',
  resave: false,
  saveUninitialized: true,
}))
app.use(bodyParser.urlencoded({ 
  extended: false 
}))

app.get('/captcha', captcha.generate())
app.get('/', function (req, res, next) {
  res.type('html')
  res.end(`
    <img src="/captcha"/>
    <form action="/test" method="post">
      <input type="text" name="captcha"/>
      <input type="submit"/>
    </form>
  `)
})
app.post('/test', (req, res) => {
  res.type('html')
  res.end(`
    <p>CAPTCHA VALID: ${captcha.validate(req, req.body.captcha)}</p>
  `)
})

app.listen(80, () => {
  console.log('server started')
})
```
