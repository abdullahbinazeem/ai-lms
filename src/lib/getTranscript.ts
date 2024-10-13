import { Innertube } from "youtubei.js/web";

export async function getTranscript(videoId: string): Promise<any> {
  const youtube = await Innertube.create({
    lang: "en",
    location: "US",
    retrieve_player: false,
  });

  try {
    const info = await youtube.getInfo(videoId);
    const transcriptData = await info.getTranscript();

    let transcript = "";

    let transcript_arr =
      transcriptData?.transcript?.content?.body?.initial_segments;
    for (const t of transcript_arr!) {
      transcript += t.snippet.text + " ";
    }

    return transcript.replaceAll("\n", "");
  } catch (error) {
    console.error("Error fetching transcript:", error);
    throw error;
  }
}
