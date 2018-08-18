const express = require('express');
require('./services/passport');

const app = express();

require('./routes/authRoutes')(app);
//console.log('before passport.use');

const PORT = process.env.PORT || 5000;
app.listen(PORT);
