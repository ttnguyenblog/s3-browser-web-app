# S3 Browser Web App (React + Amplify UI Storage)

## 🧰 Yêu cầu

* Node.js & npm
* AWS CLI đã cấu hình quyền truy cập
* Một S3 bucket với cấu hình CORS

---

## 🚀 Cài đặt & Khởi tạo dự án

```bash
sudo apt update
sudo apt install nodejs
sudo apt install npm

node -v
npm -v
```

Khởi tạo ứng dụng React sử dụng Vite:

```bash
npm create vite@latest my-s3-browser --template react
cd my-s3-browser
npm install
```

Cài đặt thư viện AWS Amplify UI Storage:

```bash
npm install @aws-amplify/ui-react-storage
```

---

## 🔐 Lấy thông tin đăng nhập tạm thời từ AWS

```bash
aws sts get-session-token --duration-seconds 3600
```

Lưu lại các giá trị:

```env
VITE_AWS_REGION=your-region
VITE_AWS_ACCOUNT_ID=your-account-id
VITE_S3_BUCKET_NAME=your-s3-bucket-name
VITE_AWS_ACCESS_KEY_ID=your-access-key-id
VITE_AWS_SECRET_ACCESS_KEY=your-secret-access-key
VITE_AWS_SESSION_TOKEN=your-session-token
```

Tạo file `.env` trong thư mục gốc và dán các biến trên vào.

---

## 📁 Cấu trúc thư mục

```
src/
  ├── App.jsx
  ├── main.jsx
  └── StorageBrowserConfig.js
```

---

## 🧠 Nội dung các file

### `main.jsx`

```jsx
if (typeof crypto.randomUUID !== 'function') {
  crypto.randomUUID = function () {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  };
}

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { StorageBrowser } from './StorageBrowserConfig';

import '@aws-amplify/ui-react-storage/styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StorageBrowser.Provider>
      <App />
    </StorageBrowser.Provider>
  </React.StrictMode>
);
```

### `App.jsx`

```jsx
import React from 'react';
import { StorageBrowser } from './StorageBrowserConfig';

export default function App() {
  return (
    <div style={{ margin: '10vh 15vw', textAlign: 'center' }}>
      <h1>S3 Storage Browser</h1>
      <StorageBrowser />
    </div>
  );
}
```

### `StorageBrowserConfig.js`

```js
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';

export const { StorageBrowser } = createStorageBrowser({
  config: {
    region: import.meta.env.VITE_AWS_REGION,
    accountId: import.meta.env.VITE_AWS_ACCOUNT_ID,
    listLocations: async () => {
      return {
        items: [
          {
            bucket: import.meta.env.VITE_S3_BUCKET_NAME,
            prefix: '',
            id: 'root',
            type: 'BUCKET',
            permissions: ['list', 'get', 'write', 'delete'],
          },
        ],
      };
    },
    getLocationCredentials: async () => {
      return {
        credentials: {
          accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
          secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
          sessionToken: import.meta.env.VITE_AWS_SESSION_TOKEN,
          expiration: new Date(Date.now() + 3600000),
        },
      };
    },
    registerAuthListener: () => {},
  },
});
```

---

## 🌐 Cấu hình CORS cho S3 Bucket

Truy cập S3 Console → Bucket của bạn → **Permissions** → **CORS configuration** và dán đoạn sau:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["http://<ip>:5173"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

Thay `<ip>` bằng IP public hoặc `localhost` nếu chạy local.

---

## ▶️ Chạy ứng dụng

```bash
npm run dev -- --host
```

Truy cập trình duyệt tại:
[http://localhost:5173](http://localhost:5173) hoặc địa chỉ IP bạn cung cấp trong `CORS`.

---

