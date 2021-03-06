const express = require('express');
const app = express();

app.use(express.json());

// routing
require('./routes/actions')(app);
require('./routes/i18n')(app);
require('./routes/leaders')(app);
require('./routes/users')(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});