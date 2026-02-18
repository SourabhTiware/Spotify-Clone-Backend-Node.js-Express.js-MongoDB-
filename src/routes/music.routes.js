import express from "express";
import musicController from "../controllers/music.controller.js"
import multer from "multer";
import authMiddleware from "../middlewares/auth.middleware.js"


const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();



    router.post("/upload",authMiddleware.authArtist, upload.single("music"), musicController.createMusic);

    router.post("/album",authMiddleware.authArtist, musicController.createAlbum);

    router.get("/",authMiddleware.authUser, musicController.getAllMusics);
    router.get("/album", authMiddleware.authUser, musicController.getAllAlbums);
    router.get("/album/:albumId", authMiddleware.authUser, musicController.getAlbumById);

    router.get("/logout", musicController.logOutUser);


export default router;