import fs from 'fs';
import path from 'path';

export const deleteImage = (filePath: string) => {
  try {
    fs.unlinkSync(path.resolve(filePath));
    ;
  } catch (err) {
    console.error(`Error deleting file: ${filePath}`, err);
  }
};

export const deleteAudio = (filePath: string) => {
  try {
    fs.unlinkSync(path.resolve(filePath));
  
  } catch (err) {
    console.error(`Error deleting file: ${filePath}`, err);
  }
};
