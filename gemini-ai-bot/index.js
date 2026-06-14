import dotenv from "dotenv";
import readlineSync from "readline-sync";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// STEP 1: Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// STEP 2: Get model (IMPORTANT FIX)
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});
let history = [];

async function chat() {
  console.log("🤖 Gemini chatbot started");
  console.log("Type 'exit' to quit.\n");

  while (true) {
   const userInput = readlineSync.question("You: ");

       

    if (userInput.toLowerCase() === "exit") {
      console.log("Exiting chatbot. Bye 👋");
      break;
    }
    history.push(`User: ${userInput}`);

    try {
      // STEP 3: correct API call
              const prompt = `
          You are having an ongoing conversation with a user.

          Conversation History:
          ${history.join("\n")}

          Current User Message:
          ${userInput}

          Answer naturally.
          `;
      console.log("\n-----PROMPT SENT TO GEMINI-----");
        console.log(prompt);
        console.log("-----------------------------\n");
      const result = await model.generateContent(prompt);

      // STEP 4: correct response handling
      const response = result.response;

      const text = response.text();
       history.push(`AI: ${text}`);
      console.log("Gemini:", text, "\n");
    } catch (error) {
      console.error("Error generating response:", error);
    }
  }
}

chat();