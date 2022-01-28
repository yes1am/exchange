const index = (req, res) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>express-react-dev-template</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script type="text/javascript" src='/assets/app.js'></script>
</html>`
}

module.exports = {
  index
}
