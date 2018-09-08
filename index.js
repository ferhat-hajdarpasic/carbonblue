//export GOOGLE_APPLICATION_CREDENTIALS=/home/ferhat/carbonblue/carbonblue.json
var http = require('http');
const { google } = require('googleapis');
let privatekey = require("./carbonblue.json");

async function main() {
  const auth = await google.auth.getClient({
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: ['https://www.googleapis.com/auth/compute',
      'https://www.googleapis.com/auth/spreadsheets']
  });
  const project = await google.auth.getDefaultProjectId();

  let token = await auth.getAccessToken();
  const sheets = google.sheets({ version: 'v4', auth });

  var request = {
    spreadsheetId: '1Spih2Sfuc__OynvVcAqyfBSPbHjovA8T4lEqfTdu1IM',  // TODO: Update placeholder value.     
    resource: {
      dataFilters: [],  // TODO: Update placeholder value.
    }
  };

  var request = {
    spreadsheetId: '1Spih2Sfuc__OynvVcAqyfBSPbHjovA8T4lEqfTdu1IM',
    range: 'Sheet1!A1:D5',
    valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
    insertDataOption: 'INSERT_ROWS',  // TODO: Update placeholder value.
    resource: {
      majorDimension: 'ROWS',
      values: [
        ["Item", "Cost", "Stocked", "Ship Date"],
        ["Wheel", "$20.50", "4", "3/1/2016"],
        ["Door", "$15", "2", "3/15/2016"],
        ["Engine", "$100", "1", "30/20/2016"],
        ["Totals", "=SUM(B2:B4)", "=SUM(C2:C4)", "=MAX(D2:D4)"]
      ]
    }
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (err) {
    console.error(err);
  }
  let count = 0;
}

main();