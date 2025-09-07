const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const auth = require('./middleware/auth');
const profileRoutes = require('./routes/profile');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(auth);

app.use('/', profileRoutes);

app.get('/', (req, res) => res.send('Me-API Playground running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
