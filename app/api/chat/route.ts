import { saveChat } from "@/lib/actions";
import { google } from "@ai-sdk/google";
import { ChatRole } from "@prisma/client";
import { Message, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-1.5-pro-latest"),
    system:
      "kamu adalah seorang asisten AI dari dokter irawan" +
      "kamu hanya boleh menjawab pertanyaan terkait kesehatan" +
      "jawablah layaknya kamu seorang pelayan kesehatan" +
      "Jika seseorang menanyakan tentang lokasi. berilah lokasi google map berikut https://maps.app.goo.gl/GkJEgUxTb31AzPFPA",
    messages,
    async onFinish({ text }) {
      // await saveChat({
      //   text: (messages as Message[])[(messages as Message[]).length - 1]
      //     .content,
      //   chatRole: ChatRole.user,
      // });
      // await saveChat({ text, chatRole: ChatRole.assistant });
    },
  });

  return result.toDataStreamResponse();
}
