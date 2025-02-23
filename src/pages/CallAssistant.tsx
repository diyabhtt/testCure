import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PhoneCall, PhoneOff } from "lucide-react";
import axios from "axios";

const CallAssistant = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const { toast } = useToast();

  const startCall = async () => {
    try {
      // Make a request to the Twilio API to initiate the call
      const response = await axios.post("/api/start-call");
      
      if (response.data.success) {
        setIsCallActive(true);
        toast({
          title: "Call Started",
          description: "You're now connected to your medical assistant",
        });
      }
    } catch (error) {
      console.error("Error initiating call:", error);
      toast({
        title: "Call Error",
        description: "There was an error starting the call.",
        variant: "destructive",
      });
    }
  };

  const endCall = async () => {
    // Logic to end the call (you can also handle hang-ups here if needed)
    setIsCallActive(false);
    toast({
      title: "Call Ended",
      description: "Your call has been completed.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-lg mx-auto">
        <Card className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">Medical Assistant Call</h1>
            <p className="text-gray-500">
              {isCallActive
                ? "Speaking with your medical assistant"
                : "Start a call with your medical assistant"}
            </p>
          </div>

          <div className="flex justify-center">
            <div
              className={`p-8 rounded-full ${
                isCallActive ? "bg-red-100" : "bg-green-100"
              }`}
            >
              {isCallActive ? (
                <PhoneOff className="h-12 w-12 text-red-600" />
              ) : (
                <PhoneCall className="h-12 w-12 text-green-600" />
              )}
            </div>
          </div>

          <div className="flex justify-center">
            {isCallActive ? (
              <Button
                variant="destructive"
                size="lg"
                className="rounded-full px-8"
                onClick={endCall}
              >
                <PhoneOff className="mr-2 h-4 w-4" />
                End Call
              </Button>
            ) : (
              <Button
                variant="default"
                size="lg"
                className="rounded-full px-8"
                onClick={startCall}
              >
                <PhoneCall className="mr-2 h-4 w-4" />
                Start Call
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CallAssistant;
