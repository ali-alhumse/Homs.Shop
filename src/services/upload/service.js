import { getSupabaseClient } from '@services/supabase';
import { successResponse, errorResponse } from '@shared/utils/response';
import appConfig from '@config/app';

export const uploadService = {
  async uploadFile(bucket, path, file) {
    try {
      const validation = this.validateFile(file);
      if (!validation.valid) {
        return errorResponse('VALIDATION_ERROR', validation.message);
      }

      const supabase = getSupabaseClient();
      if (!supabase) return errorResponse('NO_CLIENT', 'Upload service unavailable');

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) return errorResponse('UPLOAD_ERROR', 'Failed to upload file');

      return successResponse(data);
    } catch (err) {
      return errorResponse('UPLOAD_ERROR', 'An error occurred during upload');
    }
  },

  async uploadImage(bucket, path, file) {
    const validation = this.validateImage(file);
    if (!validation.valid) {
      return errorResponse('VALIDATION_ERROR', validation.message);
    }

    return this.uploadFile(bucket, path, file);
  },

  validateFile(file) {
    if (!file) return { valid: false, message: 'No file provided' };
    if (file.size > appConfig.upload.maxFileSize) {
      return { valid: false, message: `File exceeds maximum size of ${appConfig.upload.maxFileSize / 1024 / 1024}MB` };
    }
    return { valid: true };
  },

  validateImage(file) {
    if (!file) return { valid: false, message: 'No file provided' };
    if (!appConfig.upload.allowedImageTypes.includes(file.type)) {
      return { valid: false, message: `File type ${file.type} is not supported. Allowed: ${appConfig.upload.allowedImageTypes.join(', ')}` };
    }
    return this.validateFile(file);
  },

  generateFilePath(tenant, folder, fileName) {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    const ext = fileName.split('.').pop();
    return `${tenant}/${folder}/${uniqueName}.${ext}`;
  },
};
