import {
  mediaHandlerConfig,
  createMediaHandler,
} from "next-tinacms-cloudinary/dist/handlers";

//   import { isAuthorized } from '@tinacms/auth'
import { cloudinaryURL } from "@/share/env";

export const config = mediaHandlerConfig;

let cloudinaryName = "" ;
let cloudinaryKey = "" ;
let cloudinarySecret = "" ;
if (cloudinaryURL.startsWith("cloudinary://")) {
    const cloudinaryInfo = cloudinaryURL.replace("cloudinary://", "").split(/:|@/);
    cloudinaryName = cloudinaryInfo[2];
    cloudinaryKey = cloudinaryInfo[0];
    cloudinarySecret = cloudinaryInfo[1];
}

export default createMediaHandler({
  cloud_name: cloudinaryName,
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret,
  authorized: async (req, _res) => {
    try {
      // if (process.env.NODE_ENV == 'development') {
      return true;
      // }

      // const user = await isAuthorized(req)

      // return user && user.verified
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});
