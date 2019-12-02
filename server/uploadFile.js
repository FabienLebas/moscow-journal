async function uploadFile(file){
  const {Storage} = require('@google-cloud/storage');
  const storage = new Storage();
  const bucketName = 'moscou-journal';
  const fs = require('fs');

  await storage.bucket(bucketName).upload(file, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    // By setting the option `destination`, you can change the name of the
    // object you are uploading to a bucket.
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'public, max-age=31536000',
    },
  });

  fs.unlink(`${file}`, (err) => {
    if (err) throw err;
    console.log(`successfully deleted ${file} from server folder`);
  });
}

module.exports = uploadFile;
