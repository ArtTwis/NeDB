let userdb, appointmentdb, servicedb, doctordb, userauthdb;
function initDb(projectPath) {
  try {
    process.cwd();
    const Datastore = require('nedb');
    userdb = new Datastore({
      filename: path.join(projectPath, 'user.db'),
      autoload: true
    });

    appointmentdb = new Datastore({
      filename: path.join(projectPath, 'appointment.db'),
      autoload: true
    });

    servicedb = new Datastore({
      filename: path.join(projectPath, 'service.db'),
      autoload: true
    });

    doctordb = new Datastore({
      filename: path.join(projectPath, 'doctor.db'),
      autoload: true
    });

    userauthdb = new Datastore({
      filename: path.join(projectPath, 'userauth.db'),
      autoload: true
    });
  } catch (err) {
    console.log('Browser :', err);
    userdb = new Nedb({ filename: 'user.db', autoload: true });

    appointmentdb = new Nedb({ filename: 'appointment.db', autoload: true });

    servicedb = new Nedb({ filename: 'service.db', autoload: true });

    doctordb = new Nedb({ filename: 'doctor.db', autoload: true });

    userauthdb = new Nedb({ filename: 'userauth.db', autoload: true });
  }
}
