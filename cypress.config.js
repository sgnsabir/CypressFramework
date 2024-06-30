const { defineConfig } = require("cypress");
// const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const sqlServer = require('cypress-sql-server');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const ExcelJs = require('exceljs');
const { error } = require("console");

async function setupNodeEvents(on, config) {
  config.db = {
    userName: "",
    password: "",
    server: "",
    port: 3306,
    options: {
      database: "classicmodels",
      encrypt: true,
      rowCollectionOnRequestCompletion: true
    }
  }
  tasks = sqlServer.loadDBPlugin(config.db);
  on('task', tasks);

  on('task', {
    excelToJsonConverter(filePath) {
      const result = excelToJson({
        source: fs.readFileSync(filePath) // fs.readFileSync return a Buffer
      });
      return result;
    }
  });
  
  on('task', {
    async writeExcelTest({ searchText, ReplaceText, change, filePath }) {
      const workbook = new ExcelJs.Workbook();    
      await workbook.xlsx.readFile(filePath)
      const worksheet = workbook.getWorksheet('Sheet1');
      const output = await readExcel(worksheet, searchText)
      const cell = worksheet.getCell(output.row, output.column+change.colChange);
      cell.value = ReplaceText;
      //pending resolved rejected
      return workbook.xlsx.writeFile(filePath).then(() => {
        return true;
      }).catch((error) => {
          return false;
      })
  }
  });   
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
 // await preprocessor.addCucumberPreprocessorPlugin(on, config);
  require('cypress-mochawesome-reporter/plugin')(on);
  on("file:preprocessor", browserify.default(config));

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}
async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
          if (cell.value === searchText) {
              output.row = rowNumber;
              output.column = colNumber;
          }
      })
  })
  return output;
}

module.exports = defineConfig({

  defaultCommandTimeout: 3000,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: "cypress/Reports",
    charts: true,
    reportPageTitle: 'My Test Suite',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  env: {
    url: "https://rahulshettyacademy.com",
  },

  retries: {
    runMode: 1,
  },
  projectId: "23dfbf",
  e2e: {
    setupNodeEvents,
    specPattern: 'cypress/integration/examples/**/*.{js,feature,ts,tsx}'
  }
});
