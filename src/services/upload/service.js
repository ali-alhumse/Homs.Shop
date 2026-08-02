import { requestHandler } from '@services/api/requestHandler';
import { errorResponse } from '@shared/utils/response';
import { APP } from '@constants/app';

export const uploadService = {
  uploadFile(bucket, path, file) {
    const validation = this.validateFile(file);
    if (!validation.valid) {
      return errorResponse('VALIDATION_ERROR', validation.message);
    }

    return requestHandler(
      (supabase) => supabase.storage.from(bucket).upload(path, file, {
        cacheControl: '3600',
        upsert: true,
      }),
      {
        source: 'UploadService',
        fallbackCode: 'UPLOAD_ERROR',
        fallbackMessage: 'Failed to upload file',
      }
    );
  },

  uploadImage(bucket, path, file) {
    const validation = this.validateImage(file);
    if (!validation.valid) {
      return errorResponse('VALIDATION_ERROR', validation.message);
    }

    return this.uploadFile(bucket, path, file);
  },

  validateFile(file) {
    if (!file) return { valid: false, message: 'No file provided' };
    if (file.size > APP.UPLOAD.MAX_FILE_SIZE) {
      return { valid: false, message: `File exceeds maximum size of ${APP.UPLOAD.MAX_FILE_SIZE / 1024 / 1024}MB` };
    }
    return { valid: true };
  },

  validateImage(file) {
    if (!file) return { valid: false, message: 'No file provided' };
    if (!APP.UPLOAD.ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return { valid: false, message: `File type ${file.type} is not supported. Allowed: ${APP.UPLOAD.ALLOWED_IMAGE_TYPES.join(', ')}` };
    }
    return this.validateFile(file);
  },

  generateFilePath(tenant, folder, fileName) {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    const ext = fileName.split('.').pop();
    return `${tenant}/${folder}/${uniqueName}.${ext}`;
  },
};
