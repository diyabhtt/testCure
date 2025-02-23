import twilio from "twilio";

const accountSid = "AC104ca04c281590abdd5c4cf9be56ad40";  // Your Twilio SID
const authToken = "ec41e3767f09deb1246786373275a996";   // Your Twilio Auth Token
const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const call = await client.calls.create({
        url: "https://your-ngrok-url.ngrok.io/curio/voice.xml", // Your ngrok URL or public endpoint
        to: "+19724646949", // Your phone number
        from: "+16823422306", // Twilio bot number
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error initiating call:", error);
      res.status(500).json({ success: false });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
