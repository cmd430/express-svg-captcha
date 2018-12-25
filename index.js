const svgCaptcha = require('svg-captcha')

class expressCapture {
  constructor(options) {
    this.options = Object.assign({}, {
      isMath: false,
      cookie: 'captcha',
      useFont: null
    }, options)
    svgCaptcha.options = this.options
    if (this.options.useFont) {
      svgCaptcha.loadFont(this.options.useFont)
    }
  }

  generate () {
    return (req, res) => {
      const captcha = this.options.isMath ? svgCaptcha.createMathExpr(this.options) : svgCaptcha.create(this.options)
      req.session[this.options.cookie] = captcha.text
      return res.type('svg').status(200).send(captcha.data)
    }
  }

  validate (req, text) {
    let cookie = req.session[this.options.cookie]
    req.session[this.options.cookie] = null
    return cookie === text
  }
}

module.exports = expressCapture