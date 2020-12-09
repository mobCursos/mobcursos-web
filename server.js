const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
// app.options('*', cors());

app.use(express.static('./dist/mobcursos-web'));

app.get('/*', (req, res) =>
res.sendFile('index.html', {root: 'dist/mobcursos-web/'})
);

app.listen(process.env.PORT || 8080);

console.log('ANGULAR server running');