/**
 * This class represents a File.
 *
 * @author Stephan Dünkel
 * @copyright dokuSpace 2018
 */
export class File {

  // Default File URL directly from Client
  public static readonly DEFAULT_FILE_URL_DIRECT = 'https://firebasestorage.googleapis.com/v0/b/dokuspace-67e76.appspot.com/o/';

  // Default File URL from Cloud Function admin SDK
  public static readonly DEFAULT_FILE_URL = 'https://storage.googleapis.com/dokuspace-67e76.appspot.com/';

  /**
   * The Constructor of Files.
   */
  constructor() {
  }

}
