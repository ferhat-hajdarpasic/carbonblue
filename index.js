//export GOOGLE_APPLICATION_CREDENTIALS=/home/ferhat/carbonblue/carbonblue-7fb6bb02ce68.json
var http = require('http');
const {google} = require('googleapis');
let privatekey = require("./carbonblue-7fb6bb02ce68.json");

async function main() {
    const auth = await google.auth.getClient({
        // Scopes can be specified either as an array or as a single, space-delimited string.
        scopes: ['https://www.googleapis.com/auth/compute',
        'https://www.googleapis.com/auth/spreadsheets.readonly']
      });
    const project = await google.auth.getDefaultProjectId();

    let token = await auth.getAccessToken();
    const sheets = google.sheets({version: 'v4', auth});

    var request = {
      resource: {
        properties: {
          title: 'FREDDY'
        },
        sheets: [
          {
            properties: {
              title: 'Data',
              gridProperties: {
                columnCount: 6,
                frozenRowCount: 1
              }
            }
          },
          // TODO: Add more sheets.
        ]
      }
    };
    let result = await sheets.spreadsheets.create(request, function(err, response) {
      if (err) {
        console.log(err);
      }
      var spreadsheet = response.data;
      // TODO: Add header rows.
      console.log(response);
    });

    
    let count = 0;
}

main();