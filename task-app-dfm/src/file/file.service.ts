import { Injectable, Logger } from '@nestjs/common';
import * as path from 'node:path';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);
  FOLDER_PATH = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'static',
    'files',
    '\\',
  );
  MAX_FILES = 2;
  fs = require('fs');

  async getFile(inputHash: string): Promise<string> {
    const fileName = inputHash + '.svg';
    if (!this.fs.existsSync(this.FOLDER_PATH.concat(fileName))) {
      return null;
    }
    return this.fs.readFileSync(this.FOLDER_PATH.concat(fileName), 'utf8');
  }

  async saveFile(inputHash: string, fileContent: string): Promise<void> {
    try {
      if (!(await this.checkIfPathExists())) {
        this.logger.error(
          'Cannot save file. Path does not exist. Path: ',
          this.FOLDER_PATH,
        );
        return;
      }
      if (await this.checkIfMaxFilesReached()) {
        await this.deleteOldestFile();
      }

      const fileName = inputHash + '.svg';
      await this.fs.writeFileSync(
        this.FOLDER_PATH.concat(fileName),
        fileContent,
      );
    } catch (error) {
      this.logger.error('Cannot save file. Message: ', error.message);
    }
  }

  private async checkIfMaxFilesReached(): Promise<boolean> {
    const files = this.fs.readdirSync(this.FOLDER_PATH);
    return files.length >= this.MAX_FILES;
  }

  private async deleteOldestFile() {
    try {
      const files = this.fs.readdirSync(this.FOLDER_PATH);
      const oldestFile = files.sort((a: File, b: File) => {
        return (
          this.fs.statSync(this.FOLDER_PATH + a).birthtime.getTime() -
          this.fs.statSync(this.FOLDER_PATH + b).birthtime.getTime()
        );
      })[0];
      this.fs.unlinkSync(this.FOLDER_PATH + oldestFile);
    } catch (error) {
      this.logger.error('Cannot delete oldest file. Message: ', error.message);
    }
  }

  private async checkIfPathExists() {
    return this.fs.existsSync(this.FOLDER_PATH);
  }
}
