// defaultConfig Types
export interface defaultConfigTypes {
    PORT: number;
    SECRET_KEY:string;
  
}
export interface DBConfigTypes{
    DB_USER:string;
    DB_HOST:string;
    DB_NAME:string;
    DB_PASSWORD:string;
    DB_PORT:number;
}
export interface AWSConfigTypes{
    AWS_ACCESS_KEY:string;
    AWS_SECRET_KEY: string;
}
export interface FirebaseConfigTypes{
    FIREBASE_STORAGE_BUCKET:string;
}