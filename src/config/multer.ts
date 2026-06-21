import multer from "multer";

// Configuração do multer para armazenamento de arquivos
export default {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB para arquivos
  },
  fileFilter: (
    _req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Tipo de arquivo não permitido. Apenas JPEG, JPG, PNG e GIF são aceitos."
        )
      );
    }
  },
};
