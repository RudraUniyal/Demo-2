import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ThumbsUp, 
  Share2, 
  Reply,
  ArrowLeft,
  MoreHorizontal
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock thread data
const mockThread = {
  id: 1,
  title: "Tsunami preparedness in Kerala coastal areas",
  content: "What are the best practices for tsunami preparedness in our region? I've heard conflicting advice about evacuation procedures. Our family has lived on the coast for generations, but with changing climate patterns, we want to ensure we're following the most current safety guidelines.\n\nSome sources suggest moving inland immediately upon feeling an earthquake, while others recommend waiting for official warnings. What has been your experience, and what do local authorities recommend?",
  author: "Alex Morgan",
  avatar: "AM",
  timestamp: "2 hours ago",
  category: "preparedness",
  likes: 42,
  views: 128,
  isPinned: true
};

// Mock replies
const mockReplies = [
  {
    id: 1,
    content: "Great question! The official recommendation is to move inland immediately if you feel a strong earthquake near the coast. Don't wait for sirens - they might not work or could be delayed. The 'Drop, Cover, and Hold On' approach doesn't apply to tsunamis.",
    author: "Dr. Sarah Johnson",
    role: "Marine Geologist",
    avatar: "SJ",
    timestamp: "1 hour ago",
    likes: 18,
    isVerified: true
  },
  {
    id: 2,
    content: "I work with the Kerala State Disaster Management Authority. Our current protocol is:\n1. Immediate evacuation to higher ground upon earthquake\n2. Wait 15 minutes before returning if no tsunami is observed\n3. Follow official alerts via radio/phone\n\nWe're updating our community education programs this year.",
    author: "Rajesh Kumar",
    role: "Disaster Management Official",
    avatar: "RK",
    timestamp: "45 minutes ago",
    likes: 24,
    isVerified: true
  },
  {
    id: 3,
    content: "As a local fisherman with 30+ years experience, I've seen small tsunamis come in with just a rapid tide change. The key is knowing your evacuation routes. We've marked them clearly in our village now. Always head for the hills, not parallel to the shore.",
    author: "Vishnu Pillai",
    role: "Local Fisher",
    avatar: "VP",
    timestamp: "30 minutes ago",
    likes: 31,
    isVerified: false
  }
];

export function ThreadDetail() {
  const [replyContent, setReplyContent] = useState("");
  const [liked, setLiked] = useState(false);
  const [threadLikes, setThreadLikes] = useState(mockThread.likes);
  const navigate = useNavigate();

  const handleLike = () => {
    if (liked) {
      setThreadLikes(threadLikes - 1);
    } else {
      setThreadLikes(threadLikes + 1);
    }
    setLiked(!liked);
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    alert("Reply posted successfully!");
    setReplyContent("");
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Forum
          </Button>
          
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    {mockThread.isPinned && (
                      <Badge variant="default">Pinned</Badge>
                    )}
                    <CardTitle>{mockThread.title}</CardTitle>
                  </div>
                  <CardDescription>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm mr-2">
                          {mockThread.avatar}
                        </div>
                        <span>{mockThread.author}</span>
                      </div>
                      <span>{mockThread.timestamp}</span>
                      <Badge variant="secondary">
                        {mockThread.category.charAt(0).toUpperCase() + mockThread.category.slice(1)}
                      </Badge>
                      <span>{mockThread.views} views</span>
                    </div>
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none mb-6">
                <p className="whitespace-pre-line">{mockThread.content}</p>
              </div>
              
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLike}
                  className={liked ? "text-primary" : ""}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  {threadLikes}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Replies */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">{mockReplies.length} Replies</h2>
          
          <div className="space-y-6">
            {mockReplies.map((reply) => (
              <Card key={reply.id} className="bg-gradient-card border-border">
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {reply.avatar}
                      </div>
                      {reply.isVerified && (
                        <Badge variant="default" className="mt-2 text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-medium">{reply.author}</span>
                        {reply.role && (
                          <Badge variant="secondary">{reply.role}</Badge>
                        )}
                        <span className="text-sm text-muted-foreground">{reply.timestamp}</span>
                      </div>
                      
                      <div className="prose prose-invert max-w-none mb-4">
                        <p className="whitespace-pre-line">{reply.content}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          {reply.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Reply className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Reply Form */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle>Post a Reply</CardTitle>
            <CardDescription>Share your thoughts or additional information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReply} className="space-y-4">
              <div>
                <Textarea
                  placeholder="Write your reply..."
                  rows={4}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  required
                  className="bg-input/50 border-border"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="hero">
                  Post Reply
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}