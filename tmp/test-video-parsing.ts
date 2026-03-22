
function getEmbedUrl(url: string): { src: string; platform: string } | null {
  try {
    const u = new URL(url);

    // YouTube
    if (u.hostname.includes("youtube.com") || u.hostname === "youtu.be") {
      let videoId: string | null = null;
      if (u.hostname === "youtu.be") videoId = u.pathname.slice(1);
      else if (u.pathname.startsWith("/shorts/")) videoId = u.pathname.split("/shorts/")[1];
      else if (u.pathname.startsWith("/embed/")) videoId = u.pathname.split("/embed/")[1];
      else videoId = u.searchParams.get("v");
      
      if (videoId) {
        videoId = videoId.split(/[?#&]/)[0];
        return { src: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`, platform: "YouTube" };
      }
    }

    // TikTok
    if (u.hostname.includes("tiktok.com")) {
      const match = u.pathname.match(/\/video\/(\d+)/);
      if (match) return { src: `https://www.tiktok.com/embed/v2/${match[1]}`, platform: "TikTok" };
    }

    // Instagram — handles /p/, /reels/, /tv/
    if (u.hostname.includes("instagram.com")) {
      const match = u.pathname.match(/\/(p|reels|tv)\/([^/?#&]+)/);
      if (match) {
        return {
          src: `https://www.instagram.com/${match[1]}/${match[2]}/embed/`,
          platform: "Instagram",
        };
      }
    }
  } catch {
    // invalid URL
  }
  return null;
}

const testUrls = [
  "https://www.instagram.com/reels/C42n-uLMB_y/",
  "https://www.instagram.com/p/C42n-uLMB_y/?igsh=OXZqNDM0bm5idG1z",
  "https://www.instagram.com/tv/C42n-uLMB_y/",
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://www.tiktok.com/@user/video/1234567890"
];

testUrls.forEach(url => {
  console.log(`URL: ${url}`);
  console.log(`Result: ${JSON.stringify(getEmbedUrl(url), null, 2)}`);
  console.log('---');
});
