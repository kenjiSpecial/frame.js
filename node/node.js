const express = require('express');
const app = express();
const fs = require('fs');
var cors = require('cors');
const jsonfile = require('jsonfile');

app.use(cors());
app.use(express.json());

app.post('/write', (req, res) => {
	const file = `./editor/assets/${req.body.projectJsonName}.json`;
	jsonfile.writeFile(file, req.body, { spaces: 2 }, function (err) {
		if (err) console.error(err);
	});

	res.send('success');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
