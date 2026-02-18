import ImageKit from "@imagekit/nodejs";


const ImageKitClient = new ImageKit({
    privateKey: process.env.IMGKIT_PRIVATE_KIT
})


const uploadFile = async (file) =>{
    const result = await ImageKitClient.files.upload({
        file, 
        fileName: "music" +Date.now(),
        folder: "/spotify-clone/music"
    })

    return result;

}

export default uploadFile;
