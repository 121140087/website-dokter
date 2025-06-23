import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google("gemini-2.0-flash"),
      system:
        "kamu adalah seorang asisten AI dari dokter irawan" +
        "kamu hanya boleh menjawab pertanyaan terkait kesehatan" +
        "Jika pasien memerlukan pemeriksaan, arahkan ke http://praktik-dr-hema.my.id/buat-janji" +
        "jawablah layaknya kamu seorang pelayan kesehatan" +
        "Jika seseorang menanyakan tentang lokasi. berilah lokasi google map berikut https://maps.app.goo.gl/urthDgzAAjDHBUuN9",
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.log(error);
  }
}
