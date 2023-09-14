import ytdl from "ytdl-core"
import fs from "fs";

export const download = ( veideoId ) => {
    const videoURL = "https://www.youtube.com/watch" + veideoId;
    const videoURLShorts =  "https://www.youtube.com/shorts/" + veideoId;

    console.log("Realizando o download do video: " + veideoId)

    ytdl(videoURLShorts, { quality: "lowestaudio", filter: "audioonly"})
    .on("info", (info) => {
        console.log(info)
    })
}