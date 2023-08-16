import {FileType} from './enums/FileType';

export interface File {
  uuid: string;
  fileName: string;
  url: string;
  size: number;
  type: FileType;
  createdAt: Date;
  updatedAt: Date;
}
