import dotenv from "dotenv";
import readlineSync from "readline-sync";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// STEP 1: Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log(process.env.GEMINI_API_KEY);
// STEP 2: Get model (IMPORTANT FIX)
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

async function chat() {
  console.log("🤖 Gemini chatbot started");
  console.log("Type 'exit' to quit.\n");

  while (true) {
    const userInput = readlineSync.question("You: ");

    if (userInput.toLowerCase() === "exit") {
      console.log("Exiting chatbot. Bye 👋");
      break;
    }

    try {
      // STEP 3: correct API call
      const result = await model.generateContent(userInput);

      // STEP 4: correct response handling
      const response = result.response;
      const text = response.text();

      console.log("Gemini:", text, "\n");
    } catch (error) {
      console.error("Error generating response:", error);
    }
  }
}

chat();