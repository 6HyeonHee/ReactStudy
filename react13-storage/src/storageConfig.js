import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// .env 파일 생성 후
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// App을 초기화하고 Realtime을 사용할 준비를 한다.
const app = initializeApp(firebaseConfig);
/* Storage의 참조를 얻어올 때는 아래와 같이 참조URL이 설정되어야 한다. */
const storage = getStorage(app, 'gs://reactapp202408-6b3ab.appspot.com');

export { storage };
