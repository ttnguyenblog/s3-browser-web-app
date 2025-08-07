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
})
