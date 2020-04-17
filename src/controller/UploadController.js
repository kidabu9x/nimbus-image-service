import { Router } from "express";
import multer from "../config/MulterConfig";
import { upload } from "../service/UploadImageSevice";

const router = Router({
    mergeParams: true
});

router.post("/upload", multer.single("file"), async (request, res) => {
    try {
        if (!request.file) {
            throw new Error("Missing file");
        }

        const url = await upload(request.file);
        res.status(200).json({
            "data": {
                url: url
            },
            "meta": {
                "status": 200
            }
        });

    } catch (error) {

        res.status(500).json({
            "meta": {
                "status": 500,
                "message": error.message
            }
        });
    }
});

router.get("/upload", (request, response) => {
    response.status(200).json({
        "meta": {
            "status": 200
        }
    })
});

export default router;