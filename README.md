
# chrome-extension-vue3-template

## Install
```
npm install
npm run build
```

## build

打开chrome拓展程序，打包dist或者直接加载dist目录


#### .env

打包之后会自动创建.pem（私钥）和.crx（扩展程序）文件

复制.pem中的key粘贴到VUE_APP_MV3_KEY

```
VUE_APP_FIREBASE_APIKEY=XXXXXXXX
VUE_APP_FIREBASE_AUTHDOMAIN=XXXXXXXX
VUE_APP_FIREBASE_PROJECTID=XXXXXXXX
VUE_APP_FIREBASE_STORAGEBUCKET=XXXXXXXX
VUE_APP_FIREBASE_MESSAGINGSENDERID=XXXXXXXX
VUE_APP_FIREBASE_APPID=XXXXXXXX
VUE_APP_MEASUREMENTID=XXXXXXXX
VUE_APP_OAUTH2_CLIENT_ID=XXXXXXXX
VUE_APP_MV3_KEY="-----BEGIN PRIVATE KEY-----\nXXXXX.....XXXXXX\n....\nXXXXXX.....XXXXXXX\n-----END PRIVATE KEY-----"
```

## 申请chrome拓展

[https://console.firebase.google.com](https://console.firebase.google.com)

#### 复制拓展配置到：

```js
const firebaseConfig = {
   apiKey: "XXX",
   authDomain: "XXX",
   projectId: "XXX",
   storageBucket: "XXX",
   messagingSenderId: "XXX",
   appId: "XXX",
   measurementId: "XXX"
};
```

