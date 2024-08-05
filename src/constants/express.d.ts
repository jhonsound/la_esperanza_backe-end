// src/types/express.d.ts

declare namespace Express {
  export interface Request {
    file: MulterFile;
  }

  export interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
  }
}
