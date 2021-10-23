var fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export default async function handler(req, res) {

   var mintIndex = req.body.mintIndex;
    var content = await readFile('img/total', 'utf8');
    var totals = JSON.parse(content);
    totals[mintIndex] = -1;
    await writeFile('img/total', JSON.stringify(totals));
    res.send('ok');
}