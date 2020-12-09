const express = require('express');

const app = express();

app.use(express.static('./dist/mobcursos-web'));

app.get('/*', (req, res) =>
res.sendFile('index.html', {root: 'dist/mobcursos-web/'})
);

app.listen(process.env.PORT || 8080);

