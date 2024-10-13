import { YoutubeTranscript } from "youtube-transcript";

export async function getTranscript(videoId: string): Promise<string> {
  try {
    let transcript_arr = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
    });
    let transcript = "";
    for (const t of transcript_arr) {
      transcript += t.text + " ";
    }

    return transcript.replaceAll("\n", "");
  } catch (error) {
    console.log(error);
    return "";
  }
}
