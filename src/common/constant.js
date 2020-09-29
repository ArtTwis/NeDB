const dbcodes = {
  exist: 'exist',
  error: 'error',
  success: 'success',
  created: 'created',
  empty: 'empty'
};

const { remote } = require('electron');
const { BrowserWindow } = remote;
const { shell, ipcRenderer } = require('electron');
const fs = require('fs-extra');
const path = require('path');
const editJsonFile = require('edit-json-file');
const uuidv4 = require('uuid/v4');
let date = new Date();

let appRoot, metaDataDir, metaDataPath, metaFile, clientInfoPath, clientInfoFile, projectPath, projectName;
