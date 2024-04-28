export interface FileType {
  file_name: string;
  file_size: string;
  created_at: string;
  id: number;
  action?: "encrypt" | "decrypt"; // specifying string literals directly
  cloud_provider: string;
  encryption_method: string;
  encrypted_string: string;
  hasBeenUploadedToCloud : boolean
  blob? : string;
}

export interface Options {
  value: string;
  label: string;
}

export interface FileThatHaveNotBeenUploaded {
  file_name: string;
  created_at: Date | number;
  file_size: string;
  action: string;
  encryption_method?: string;
  cloud_provider?: string;
  encrypted_string?: string;
  file?: File;
}
