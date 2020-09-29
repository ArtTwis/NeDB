function initiClientInfo() {
  //clientId generator
  clientInfoPath = path.join(appRoot, 'metaData', 'clientInfo.json');
  clientInfoFile = new editJsonFile(clientInfoPath, {
    autosave: true
  });

  const version = remote.app.getVersion();
  clientId = clientInfoFile.get('clientId');

  if (!clientId) {
    const cleintId = require('uuid/v4')();
    clientInfoFile.set('clientId', cleintId);
    clientInfoFile.save();
  }
  if (version) {
    clientInfoFile.set('verison', version);
    clientInfoFile.save();
  }
}

function initProject() {
  try {
    process.cwd();
    appRoot = remote.app.getPath('userData');
    const appName = remote.app.getName();
    metaDataDir = path.resolve(appRoot, 'metaData');
    repoBasepath = path.resolve(appRoot, 'userData');

    //check and create metaData directory if not exist
    if (!fs.existsSync(metaDataDir)) {
      fs.mkdirSync(metaDataDir);
    }

    //check and create userData directory if not exist
    if (!fs.existsSync(repoBasepath)) {
      fs.mkdirSync(repoBasepath);
    }

    metaDataPath = path.resolve(appRoot, 'metaData', 'metaData.json');
    metaFile = editJsonFile(metaDataPath, {
      autosave: true
    });

    projectName = metaFile.get('currentProject');

    if (!projectName) {
      projectName = 'default';
      metaFile.set('currentProject', projectName);
      projectPath = path.join(appRoot, 'userData', projectName);
      const projectDetails = {
        projectName,
        projectType: 'local',
        projectPath: projectPath
      };
      metaFile.set(projectName, projectDetails);
    }
    currProjectName = projectName;

    // displaying current Project name ....
    // document.querySelector('#currentProject').textContent = projectName;

    let currProjectObj = metaFile.get(projectName);
    if (currProjectObj.projectPath) projectPath = currProjectObj.projectPath;
    else projectPath = path.resolve(appRoot, 'userData', projectName);
    initDb(projectPath);
  } catch (error) {
    console.log('browser', error);
  }
}

// Calling functions....
initProject();
initiClientInfo();
