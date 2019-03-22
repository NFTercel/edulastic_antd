class FileHelper {
  static getSpecName(name) {
    const filepath = name.split("/");
    const specName = filepath[filepath.length - 1];
    return specName;
  }
}

export default FileHelper;
