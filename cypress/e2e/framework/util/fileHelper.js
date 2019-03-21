class FileHelper {
  static getSpecName(name) {
    var filepath = name.split("/");
    var specName = filepath[filepath.length - 1];
    return specName;
  }
}

export default FileHelper;
