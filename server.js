const express = require('express');
const cors = require('cors');

const app = express();

app.options('*', cors());
// app.use(cors);
app.use(express.static('./dist/mobcursos-web'));

app.get('/*', (req, res) =>
res.sendFile('index.html', {root: 'dist/mobcursos-web/'})
);

app.listen(process.env.PORT || 8080);

