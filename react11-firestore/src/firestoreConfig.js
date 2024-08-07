// Firebase에서 생성한 API 정보를 저장해 놓은 파일

// 파이어베이스 초기화, 사용을 위한 함수 임포트
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// 본인의 API Key와 관련 정보(.env파일 생성 전)
// const firebaseConfig = {
//   apiKey: 'AIzaSyCPZvgIo5kpe545dBAKcTnmkQs6oN74gjQ',
//   authDomain: 'reactapp202408-6b3ab.firebaseapp.com',
//   projectId: 'reactapp202408-6b3ab',
//   storageBucket: 'reactapp202408-6b3ab.appspot.com',
//   messagingSenderId: '258232881716',
//   appId: '1:258232881716:web:88acb2acc107b8a1703061',
//   measurementId: 'G-7ZEMYBWXTF',
// };

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

// 파이어베이스 앱 초기화
const app = initializeApp(firebaseConfig);
// 파이어스토어 객체 생성 및 내보내기
const firestore = getFirestore(app);
export { firestore };
