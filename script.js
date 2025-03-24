const API_KEY = "AIzaSyBYVyF2_EXZNmdfpic81JpppguBIE263T0";
const CHANNEL_ID = "UCEhSpfE0RGtepNTdtjz4qpA";

const videoContainer = document.getElementById("video-container");
const searchBar = document.getElementById("search-bar");

async function fetchVideos() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&maxResults=6`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        videoContainer.innerHTML = "";

        data.items.forEach(item => {
            if (item.id.videoId) {
                const videoCard = document.createElement("div");
                videoCard.classList.add("video-card");
                videoCard.innerHTML = `
                    <iframe src="https://www.youtube.com/embed/${item.id.videoId}" allowfullscreen></iframe>
                    <h3>${item.snippet.title}</h3>
                `;
                videoContainer.appendChild(videoCard);
            }
        });

    } catch (error) {
        console.error("Error fetching videos: ", error);
    }
}

searchBar.addEventListener("input", function () {
    const searchTerm = searchBar.value.toLowerCase();
    const videos = document.querySelectorAll(".video-card");

    videos.forEach(video => {
        const title = video.querySelector("h3").textContent.toLowerCase();
        video.style.display = title.includes(searchTerm) ? "block" : "none";
    });
});

fetchVideos();
