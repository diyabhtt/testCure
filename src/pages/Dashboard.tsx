
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PhoneCall, MessageSquare, User } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Medical Assistant Dashboard</h1>
          <p className="text-gray-500">Welcome to your personal healthcare companion</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium">Profile</h3>
              <p className="text-sm text-gray-500 text-center">Manage your profile information</p>
              <Button variant="outline" className="w-full" onClick={() => navigate("/profile")}>
                View Profile
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 bg-green-100 rounded-full">
                <PhoneCall className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium">Voice Call</h3>
              <p className="text-sm text-gray-500 text-center">Talk to your medical assistant</p>
              <Button variant="outline" className="w-full" onClick={() => navigate("/call")}>
                Start Call
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium">Chat</h3>
              <p className="text-sm text-gray-500 text-center">Message your medical assistant</p>
              <Button variant="outline" className="w-full" onClick={() => navigate("/chat")}>
                Open Chat
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
