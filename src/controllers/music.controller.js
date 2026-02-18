import musicModel from "../models/music.model.js";
import uploadFile from "../services/storage.service.js"
import albumModel from "../models/album.model.js";


   // ***************************************************** // Create music route for artist user.    // ***************************************************** 

    const createMusic = async (req, res) =>{

// after checking the user role then  extract title and file from the body. 

            const {title} = req.body;
            const file = req.file;

// In result variable pass the file in uploadFile function with convert it into the base64 string. 
// and this method return the file, filename and folder

            const result = await uploadFile(file.buffer.toString("base64"));

// create a musicModel, pass the url, title, artist
            const music = await musicModel.create({
                url: result.url,
                title, 
                artist: req.user.id,
            });

// send status code with message and music related information. 
            res.status(201).json({
                message: "Music created succesfully",
                music:{
                    id: music._id, 
                    url: music.url,
                    title: music.title,
                    artist: music.artist
                }
            });


    };





   // *****************************************************  // Create album router    // ***************************************************** 

    const createAlbum = async (req,res) =>{
// extract title and musicId from body. 

            const {title, music} = req.body;



        // findOneAndUpdate with 'upsert' will:
        // 1. Find an album by this artist and title.
        // 2. If found, overwrite the 'music' array with the new one.
        // 3. If NOT found, create a new album document.
        const album = await albumModel.findOneAndUpdate(
            { title: title, artist: req.user.id }, // Filter
            { music: music },                    // Data to update
            { 
                 returnDocument: "after",      // Return the updated document
                upsert: true,   // Create it if it doesn't exist
                runValidators: true,
            }
        );

        // Determine if we updated or created
        const status = album.wasNew ? 201 : 200;
        const message = "Album processed successfully";


        res.status(status).json({

            message,
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                music: album.music,

            }

        });


// // create album into album model using title and musicids also pass the aritst from decode.id 
//             const album = await albumModel.create({
//                 title, 
//                 artist: decode.id,
//                 music: music,
//             });

// // send response after all operation done. and pass album related information 
//             res.status(201).json({
//                 message:"album creaetd successfully",
//                 album: {
//                     id: album.id,
//                     title: album.title,
//                     artist: album.artist,
//                     music: album.music,
//                 }
//             })

    };


    const getAllMusics =async (req,res) =>{
        const music = await musicModel
            .find()
            .skip(1)
            .limit(10)
            .populate("artist","username email");

        res.status(200).json({
            message:"music fetched successfully",
            music : music
        });
    };


    const getAllAlbums = async (req,res) =>{
        const album = await albumModel.find().select("title artist").populate("artist", "username email");

        // const album = await albumModel.find().populate({
        //     path: "music",
        //     select: "url title artist",
        //     populate: {
        //         path: "artist",
        //         select: "username"
        //     }
        // });

        res.status(200).json({
            message:"Albums fected successfully",
            ablum: album,
        });
    }

    const getAlbumById = async (req,res) =>{
        const albumId = req.params.albumId;

        const album = await albumModel.findById(albumId).populate("artist", "username email").populate("music", "url title");

        res.status(200).json({
            message:"Albums songs fected successfully",
            ablum: album,
        });

    }


    const logOutUser = async (req,res) =>{
        res.clearCookie("token");

        res.status(200).json({
            message: "User logout successfully"
        });
    }

// export the createMusic function .


export default {createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById, logOutUser};