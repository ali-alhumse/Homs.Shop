const appConfig = {
  name: 'Homs Shop',
  version: '0.0.0',
  pagination: {
    defaultPageSize: 20,
    pageSizes: [10, 20, 50, 100],
  },
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
  debounceDelay: 300,
  cacheDuration: 5 * 60 * 1000, // 5 minutes
};

export default appConfig;
