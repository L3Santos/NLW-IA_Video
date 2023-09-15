import ytdl from "ytdl-core"
import fs from "fs";

export const download = ( veideoId ) => 
    new Promise ((resolve, rejects) => {
        const videoURL = "https://www.youtube.com/watch?v=" + veideoId;
        const videoURLShorts =  "https://www.youtube.com/shorts/" + veideoId;

        console.log("Realizando o download do video: " + veideoId)

        ytdl(videoURLShorts, { quality: "lowestaudio", filter: "audioonly"})
        .on("info", (info) => {

            const seconds = info.formats[0].approxDurationMs / 1000;

            if(seconds > 60) {
                throw new Error("A duração desse video é maior do que 60 segundos")
            }
        })
        .on("end", () => {
            console.log("Download do vídeo finalizado.")
            resolve()
        })
        .on("error", (error) => {
            console.log("Não foi possível fazer o download do vídeo! Detalhes do erro:",
                error
            )
            rejects(error)
        })
        .pipe(fs.createWriteStream("./tmp/audio.mp4"))
})