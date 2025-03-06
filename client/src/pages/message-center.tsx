import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Search, Send, User, AlertCircle, MessageSquare, Clock } from "lucide-react";
import { useState } from "react";

// Mock data for messages and tickets
const mockMessages = [
  {
    id: 1,
    sender: "John Smith",
    role: "Hotel Manager",
    message: "Monthly staff review meeting scheduled for tomorrow",
    timestamp: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    sender: "Sarah Wilson",
    role: "Receptionist",
    message: "Need clarification on new check-in procedure",
    timestamp: "Yesterday",
    unread: false,
  },
];

const mockTickets = [
  {
    id: 1,
    title: "System Access Issue",
    description: "Unable to access room management system",
    status: "Open",
    priority: "High",
    created: "2024-03-05",
    assignedTo: "IT Support",
  },
  {
    id: 2,
    title: "Staff Training Request",
    description: "Need training session for new booking system",
    status: "In Progress",
    priority: "Medium",
    created: "2024-03-04",
    assignedTo: "Training Team",
  },
];

export default function MessageCenter() {
  const [activeTab, setActiveTab] = useState("messages");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Message Center</h1>
        <p className="text-muted-foreground">Communication and support hub</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Conversations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search messages..." className="pl-8" />
                </div>
                <div className="mt-4 space-y-2">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg cursor-pointer ${
                        message.unread
                          ? "bg-primary/5 hover:bg-primary/10"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedMessage(message.id)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{message.sender}</p>
                          <p className="text-xs text-muted-foreground">{message.role}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 truncate">
                        {message.message}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Message Thread</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-lg">
                  {selectedMessage ? (
                    <div className="w-full h-full p-4 space-y-4">
                      {/* Message thread content will go here */}
                      <div className="flex justify-end">
                        <div className="bg-primary/10 rounded-lg p-3 max-w-[70%]">
                          <p className="text-sm">How can I help you today?</p>
                          <span className="text-xs text-muted-foreground">10:30 AM</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Select a conversation to view messages</p>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Input placeholder="Type your message..." />
                  <Button>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tickets">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Support Tickets</CardTitle>
              <Button>
                <AlertCircle className="h-4 w-4 mr-2" />
                Create Ticket
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTickets.map((ticket) => (
                  <Card key={ticket.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            {ticket.title}
                            <Badge variant="outline" className={
                              ticket.priority === "High" ? "bg-red-100 text-red-800" :
                              ticket.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                              "bg-green-100 text-green-800"
                            }>
                              {ticket.priority}
                            </Badge>
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {ticket.description}
                          </p>
                        </div>
                        <Badge className={
                          ticket.status === "Open" ? "bg-green-100 text-green-800" :
                          ticket.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                          "bg-gray-100 text-gray-800"
                        }>
                          {ticket.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Created: {ticket.created}
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Assigned to: {ticket.assignedTo}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}