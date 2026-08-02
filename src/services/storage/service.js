import { requestHandler } from '@services/api/requestHandler';

export const storageService = {
  listFiles(bucket, path = '') {
    return requestHandler(
      (supabase) => supabase.storage.from(bucket).list(path),
      {
        source: 'StorageService',
        fallbackCode: 'STORAGE_ERROR',
        fallbackMessage: 'Failed to list files',
      }
    );
  },

  getPublicUrl(bucket, path) {
    return requestHandler(
      (supabase) => supabase.storage.from(bucket).getPublicUrl(path),
      {
        source: 'StorageService',
        fallbackCode: 'STORAGE_ERROR',
        fallbackMessage: 'Failed to generate public URL',
        normalize: (result) => result.data?.publicUrl ?? null,
      }
    );
  },

  deleteFile(bucket, path) {
    return requestHandler(
      (supabase) => supabase.storage.from(bucket).remove([path]),
      {
        source: 'StorageService',
        fallbackCode: 'STORAGE_ERROR',
        fallbackMessage: 'Failed to delete file',
      }
    );
  },

  getSignedUrl(bucket, path, expiresIn = 60) {
    return requestHandler(
      (supabase) => supabase.storage.from(bucket).createSignedUrl(path, expiresIn),
      {
        source: 'StorageService',
        fallbackCode: 'STORAGE_ERROR',
        fallbackMessage: 'Failed to create signed URL',
        normalize: (result) => result.data?.signedUrl ?? null,
      }
    );
  },
};
