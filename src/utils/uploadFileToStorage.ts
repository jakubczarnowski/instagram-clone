import { storageBucketsNames, supabase } from "~/shared/supabaseClient";

export const uploadFileToStorage = async (
  userId: string,
  id: string,
  file: File
) => {
  const { error, data } = await supabase()
    .storage.from(storageBucketsNames.postsImages)
    .upload(`${userId}/${id}`, file, { upsert: true });

  if (error) return { error };

  const { data: signedURLData, error: publicUrlError } = await supabase()
    .storage.from(storageBucketsNames.postsImages)
    .createSignedUrl(data.path, 999_999_999);

  if (publicUrlError) return { error: publicUrlError };

  return { url: signedURLData.signedUrl };
};
