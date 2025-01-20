import multer from "multer";

import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadPath = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); //Uploadpath always need to specfy to the ../../uploads folders in the root directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/ /g, "_"));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jgp", "image/jpeg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid File type, Allowed types are image/jpg,image/png,image/jpeg"
      )
    );
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 2140 * 2140 },
});

//Single File Upload
export function singleFileUpload(req, res, next) {
  try {
    if (!req.file) {
      return next({
        status: 400,
        success: false,
        message: "Please Upload File",
      });
    }
    return res.status(200).json({
      success: true,
      message: "File Uploaded",
      file: req.file,
    });
  } catch (error) {
    next(error);
  }
}

//Multiple File Uploads

export function multipleFileUpload(req, res, next) {
  try {
    if (!req.files.length) {
      return next({
        status: 400,
        success: false,
        message: "Please Upload Files",
      });
    }
    const fileUrls = req.files.map((file) => file.filename);

    return res.status(200).json({
      success: true,
      message: "Files Uploaded Successfully",
      fileUrls,
    });
  } catch (error) {
    next(error);
  }
}
