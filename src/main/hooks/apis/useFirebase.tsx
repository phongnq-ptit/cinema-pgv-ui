import {initializeApp} from 'firebase/app';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';

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
    folder: string,
    file: File,
    callback?: Function
  ) => {
    const imageRef = ref(storage, `${folder}/${file.name}`);

    await uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        callback && callback(url);
      });
    });
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

  return {uploadSingleFile, downloadFile};
};

export default useFirebase;
