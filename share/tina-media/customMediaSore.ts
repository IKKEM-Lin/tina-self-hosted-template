/**

*/

import type {
  Media,
  MediaList,
  MediaListOptions,
  MediaStore,
  MediaUploadOptions,
} from "tinacms";
import { DEFAULT_MEDIA_UPLOAD_TYPES } from "tinacms";

//   import { E_UNAUTHORIZED, E_BAD_ROUTE, interpretErrorMessage } from './errors'

export class CustomMediaStore implements MediaStore {
  fetchFunction = (input: RequestInfo, init?: RequestInit) => {
    return fetch(input, init);
  };
  accept = DEFAULT_MEDIA_UPLOAD_TYPES;

  async persist(media: MediaUploadOptions[]): Promise<Media[]> {
    const newFiles: Media[] = []
    // Folder always has leading and trailing slashes
    let folder: string = '/api/images/'

    for (const item of media) {
      const { file, directory } = item
      // Stripped directory does not have leading or trailing slashes
      let strippedDirectory = directory
      if (strippedDirectory.startsWith('/')) {
        strippedDirectory = strippedDirectory.substr(1) || ''
      }
      if (strippedDirectory.endsWith('/')) {
        strippedDirectory =
          strippedDirectory.substr(0, strippedDirectory.length - 1) || ''
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('directory', directory)
      formData.append('filename', file.name)

      let uploadPath = `${
        strippedDirectory ? `${strippedDirectory}/${file.name}` : file.name
      }`
      if (uploadPath.startsWith('/')) {
        uploadPath = uploadPath.substr(1)
      }
      const filePath = `${
        strippedDirectory
          ? `${folder}${strippedDirectory}/${file.name}`
          : folder + file.name
      }`
      const res = await this.fetchFunction(`/api/media?path=${uploadPath}`, {
        method: 'POST',
        body: formData,
      })

      if (res.status != 200) {
        const responseData = await res.json()
        throw new Error(responseData.message)
      }

      const fileRes = await res.json()
      if (fileRes?.success) {
        const parsedRes: Media = {
          type: 'file',
          id: file.name,
          filename: file.name,
          directory,
          src: filePath,
          thumbnails: {
            '75x75': filePath,
            '400x400': filePath,
            '1000x1000': filePath,
          },
        }

        newFiles.push(parsedRes)
      } else {
        throw new Error('Unexpected error uploading media')
      }
    }
    return newFiles
  }

  async delete(media: Media) {
    const path = `${
      media.directory ? `${media.directory}/${media.filename}` : media.filename
    }`;
    await this.fetchFunction(`/api/media?path=${path}`, {
      method: "DELETE",
    });
  }

  private genThumbnail(src: string, dimensions: { w: number; h: number }) {
    return src
  }

  async list(options: MediaListOptions): Promise<MediaList> {
    const res = await this.fetchFunction(
      `/api/media?path=${options.directory || ""}&limit=${options.limit || 20}${
        options.offset ? `&cursor=${options.offset}` : ""
      }`
    );

    if (res.status == 404) {
      throw "Directory not found";
    }

    if (res.status >= 500) {
      const { e } = await res.json();
      const error = new Error("Unexpected error");
      console.error(e);
      throw error;
    }

    const { cursor, files, directories } = await res.json();

    const items: Media[] = [];
    for (const file of files) {
      items.push({
        directory: options.directory || "",
        type: "file",
        id: file.filename,
        filename: file.filename,
        src: file.src,
        thumbnails: options?.thumbnailSizes?.reduce((acc, { w, h }) => {
          acc[`${w}x${h}`] = this.genThumbnail(file.src, { w, h });
          return acc;
        }, {} as any),
      });
    }

    for (const dir of directories) {
      items.push({
        type: "dir",
        id: dir,
        directory: options.directory || "",
        filename: dir,
      });
    }

    return {
      items,
      nextOffset: cursor || 0,
    };

    // const { items, offset } = await response.json();
    // return {
    //   items: items.map((item) => item),
    //   nextOffset: offset,
    // };
  }

  parse = (img: any) => {
    return img.src;
  };
}
