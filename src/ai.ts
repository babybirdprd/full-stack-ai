import "dotenv/config";
import consola from "consola";
import ollama from "ollama";
import { getActions } from "./actions";

export async function generateCode(prompt: string) {
  consola.log("Generating code with Ollama...");

  const messages = [
    {
      role: "system",
      content: `You are an AI that builds full-stack apps for users.
You are able to call functions to build the app.
Build what you can with the functions.
After you've done your work scaffolding the app as much as you can, the user will take over and complete the work.`,
    },
    { role: "user", content: prompt },
  ];

  try {
    const response = await ollama.chat({
      model: "llama2",
      messages: messages,
      stream: true,
    });

    for await (const part of response) {
      consola.log("> message", part.message.content);
    }

    consola.log("Generation complete.");
  } catch (error) {
    consola.error("Error generating code with Ollama:", error);
  }
}
