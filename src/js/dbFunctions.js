const appointment = {
  add: function(obj) {
    let dfd = jQuery.Deferred();
    if (!obj) {
      console.error('request is undefined or not valid');
      dfd.resolve({ code: dbcodes.error });
      return dfd.promise();
    }
    let timeStamp = new Date().getTime();
    obj['timeStamp'] = timeStamp;
    appointmentdb.insert(obj, function(err, newDoc) {
      if (err) {
        console.error('err ', err);
        dfd.resolve({ code: dbcodes.error });
      }
      dfd.resolve({ code: dbcodes.success, docs: newDoc });
      return dfd.promise();
    });
    return dfd.promise();
  },
  find: function(obj) {
    let dfd = jQuery.Deferred();
    appointmentdb
      .find(obj)
      .sort({ timeStamp: -1 })
      .exec(function(err, docs) {
        if (err) {
          console.error('Exception while finding in history.');
          dfd.resolve({ code: dbcodes.error });
          return dfd.promise();
        }
        dfd.resolve({ code: dbcodes.success, docs: docs });
      });
    return dfd.promise();
  },
  remove: function(queryObj) {
    let dfd = jQuery.Deferred();
    if (!queryObj) {
      console.error('queryObj to remove history items can not undefined.');
      dfd.resolve({ code: dbcodes.error });
      return dfd.promise();
    }
    appointmentdb.remove(queryObj, { multi: true }, function(err, numRemoved) {
      if (err) {
        console.error('Exception deleting history Items: ' + suiteName);
        dfd.reject({ code: dbcodes.error });
        return dfd.promise();
      }
      dfd.resolve({ code: dbcodes.success, docs: numRemoved });
    });
    return dfd.promise();
  }
};
