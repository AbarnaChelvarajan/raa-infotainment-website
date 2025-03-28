const API_KEY = "AIzaSyBYVyF2_EXZNmdfpic81JpppguBIE263T0";
const CHANNEL_ID = "UCEhSpfE0RGtepNTdtjz4qpA";

const videoContainer = document.getElementById("video-container");
const searchBar = document.getElementById("search-bar");

async function fetchVideos() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&maxResults=10&order=date`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Sort videos in ascending order (oldest first)
        const sortedVideos = data.items.sort((a, b) => 
            new Date(a.snippet.publishedAt) - new Date(b.snippet.publishedAt)
        );

        videoContainer.innerHTML = "";

        sortedVideos.forEach(item => {
            if (item.id.videoId) {
                const videoCard = document.createElement("div");
                videoCard.classList.add("video-card");
                videoCard.innerHTML = `
                    <iframe src="https://www.youtube.com/embed/${item.id.videoId}" allowfullscreen></iframe>
                    <h3>${item.snippet.title}</h3>
                    <div class="actions">
                        <a href="https://www.youtube.com/watch?v=${item.id.videoId}&feature=share" target="_blank" class="share-btn">Share</a>
                        <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank" class="like-btn">Like</a>
                    </div>
                `;
                videoContainer.appendChild(videoCard);
            }
        });

    } catch (error) {
        console.error("Error fetching videos: ", error);
    }
}

// Search Functionality
searchBar.addEventListener("input", function () {
    const searchTerm = searchBar.value.toLowerCase();
    const videos = document.querySelectorAll(".video-card");

    videos.forEach(video => {
        const title = video.querySelector("h3").textContent.toLowerCase();
        video.style.display = title.includes(searchTerm) ? "block" : "none";
    });
});

fetchVideos();

