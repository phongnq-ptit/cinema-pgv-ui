import {initializeApp} from 'firebase/app';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {StorageLocation} from '../../models/enums/StorageLocation';
import {File as FileApi} from '../../models/File';
import {FileType} from '../../models/enums/FileType';

const useFirebase = () => {
  const firebaseConfig = {
    apiKey: '<PRIVATE>',
    authDomain: '<PRIVATE>',
    projectId: '<PRIVATE>',
    storageBucket: '<PRIVATE>',
    messagingSenderId: '<PRIVATE>',
    appId: '<PRIVATE>',
    measurementId: '<PRIVATE>',
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const uploadSingleFile = async (
    folder: StorageLocation,
    file: File,
    type: FileType
  ): Promise<FileApi> => {
    const imageRef = ref(storage, `${folder}/${file.name}`);
    return new Promise((resolve, reject) => {
      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          resolve({
            fileName: file.name,
            size: file.size,
            type: type,
            url: url,
          } as FileApi);
        });
      });
    });
  };

  const uploadMultiFiles = async (
    folder: StorageLocation,
    files: File[],
    type: FileType
  ) => {
    const promises: Promise<FileApi>[] = [];
    for (const file of files) {
      promises.push(uploadSingleFile(folder, file, type));
    }

    return Promise.all(promises);
  };

  const downloadFile = async (url: string, fileName: string) => {
    await fetch(url, {method: 'GET'})
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  return {uploadSingleFile, uploadMultiFiles, downloadFile};
};

export default useFirebase;
