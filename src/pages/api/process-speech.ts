import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const speechInput = req.body.SpeechResult; // The user's spoken input

      // Make a request to Eleven Labs for generating the speech output
      const response = await axios.post(
        "https://api.elevenlabs.io/v1/speech/generate",
        {
          apiKey: "your_eleven_labs_api_key",  // Eleven Labs API Key
          text: `You said: ${speechInput}. How can I assist you further?`,  // The text to be spoken
        }
      );

      const generatedSpeech = response.data.audioUrl; // The URL for the generated speech file

      // Send the TwiML to play the generated speech
      res.type("xml").send(`
        <Response>
          <Play>${generatedSpeech}</Play>
        </Response>
      `);
    } catch (error) {
      console.error("Error generating speech:", error);
      res.status(500).send("<Response><Say>There was an error processing your request.</Say></Response>");
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
