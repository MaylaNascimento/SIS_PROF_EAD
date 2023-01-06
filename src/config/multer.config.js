import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "/.data/documentos");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = new Date().getTime();
    cb(null, `[${uniquePrefix}]${file.fieldname}`);
  },
});

const upload = multer({ storage: storage });

export default upload;
