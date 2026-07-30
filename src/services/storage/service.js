import { getSupabaseClient } from '@services/supabase';
import { successResponse, errorResponse } from '@shared/utils/response';

export const storageService = {
  async listFiles(bucket, path = '') {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) return errorResponse('NO_CLIENT', 'Storage service unavailable');

      const { data, error } = await supabase.storage.from(bucket).list(path);
      if (error) return errorResponse('STORAGE_ERROR', 'Failed to list files');

      return successResponse(data);
    } catch (err) {
      return errorResponse('STORAGE_ERROR', 'An error occurred while listing files');
    }
  },

  async getPublicUrl(bucket, path) {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) return errorResponse('NO_CLIENT', 'Storage service unavailable');

      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      return successResponse(data.publicUrl);
    } catch (err) {
      return errorResponse('STORAGE_ERROR', 'Failed to generate public URL');
    }
  },

  async deleteFile(bucket, path) {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) return errorResponse('NO_CLIENT', 'Storage service unavailable');

      const { error } = await supabase.storage.from(bucket).remove([path]);
      if (error) return errorResponse('STORAGE_ERROR', 'Failed to delete file');

      return successResponse(null);
    } catch (err) {
      return errorResponse('STORAGE_ERROR', 'An error occurred while deleting file');
    }
  },

  async getSignedUrl(bucket, path, expiresIn = 60) {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) return errorResponse('NO_CLIENT', 'Storage service unavailable');

      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, expiresIn);

      if (error) return errorResponse('STORAGE_ERROR', 'Failed to create signed URL');

      return successResponse(data.signedUrl);
    } catch (err) {
      return errorResponse('STORAGE_ERROR', 'An error occurred');
    }
  },
};
