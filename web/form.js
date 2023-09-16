import { server } from "./server.js";

const form = document.querySelector("#form");
const input = document.querySelector("#url")
const content = document.querySelector("#content")


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    content.classList.add("placeholder");

    const videoURL = input.value;

    if(!videoURL.includes("youtube")) {
        content.textContent = "Esse vídeo não parece ser da plataforma youtube"

    
    }
    const [_S, params] = videoURL.split("/shorts/");    
    const [videoID] = params.split("?si");
    console.log(videoID);

    // if(videoURL.includes != null) {
    //     const [_Shorts, paramsShorts] = videoURL.split("/shorts/");    
    //     const [videoIdShorts] = paramsShorts.split("?si");
    //     console.log(videoIdShorts);
    // } else if (videoURL.includes("watch?v=")) {
    //     const [_Watch, paramsWatch] = videoURL.split("/watch?v=");
    //     const [videoIdWatch] = paramsWatch.split("?si");
    //     console.log(videoIdWatch)
    // }

    content.textContent = "Obtendo o texto do áudio";
    const transcription = await server.get("/summary/" + videoID);
    
    content.textContent = "Realizando o resumo";
    
    const summary = await server.post("/summary/", {
        text: transcription.data.result,
    });
    
    content.textContent = summary.data.result;
    content.classList.remove("placeholder");
    
})