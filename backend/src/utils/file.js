import fs from 'fs';
import path from 'path';

const deleteFile = (filePath) => {
  const basePath = path.resolve('backend/src/assets/');
  const fullPath = path.join(basePath, filePath);

  console.log('Deleting file at path:', fullPath);

  fs.unlink(fullPath, (err) => {
    if (err) {
      throw err;
    }
    console.log('File deleted successfully');
  });
};

export { deleteFile };
