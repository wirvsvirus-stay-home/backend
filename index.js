const express = require('express');
const app = express();

// routing
require('./routes/i18n')(app);
require('./routes/leaders')(app);
require('./routes/users')(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});