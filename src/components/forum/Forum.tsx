import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  ThumbsUp, 
  Share2, 
  Filter,
  Search,
  Plus,
  Eye,
  MessageSquare
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock forum data
const mockThreads = [
  {
    id: 1,
    title: "Tsunami preparedness in Kerala coastal areas",
    content: "What are the best practices for tsunami preparedness in our region? I've heard conflicting advice about evacuation procedures.",
    author: "Alex Morgan",
    avatar: "AM",
    timestamp: "2 hours ago",
    category: "preparedness",
    replies: 24,
    likes: 42,
    views: 128,
    isPinned: true
  },
  {
    id: 2,
    title: "Storm surge warning system effectiveness",
    content: "Has anyone experienced issues with the current storm surge warning system? I missed an alert during last week's event.",
    author: "Priya Sharma",
    avatar: "PS",
    timestamp: "5 hours ago",
    category: "technology",
    replies: 18,
    likes: 31,
    views: 95,
    isPinned: false
  },
  {
    id: 3,
    title: "Community reporting best practices",
    content: "What guidelines should we follow when reporting hazards through the OceanWatch platform? Looking for tips on accuracy and safety.",
    author: "Raj Patel",
    avatar: "RP",
    timestamp: "1 day ago",
    category: "reporting",
    replies: 32,
    likes: 56,
    views: 210,
    isPinned: false
  },
  {
    id: 4,
    title: "Emergency kit recommendations for coastal families",
    content: "Sharing my family's emergency kit checklist that we update seasonally. Would love feedback from other coastal residents.",
    author: "Maria Gonzalez",
    avatar: "MG",
    timestamp: "1 day ago",
    category: "preparedness",
    replies: 15,
    likes: 28,
    views: 87,
    isPinned: false
  }
];

const categories = [
  { id: "all", name: "All Topics", count: 42 },
  { id: "preparedness", name: "Preparedness", count: 18 },
  { id: "technology", name: "Technology", count: 12 },
  { id: "reporting", name: "Reporting", count: 15 },
  { id: "community", name: "Community", count: 9 }
];

export function Forum() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const navigate = useNavigate();

  const filteredThreads = mockThreads.filter(thread => {
    const matchesCategory = selectedCategory === "all" || thread.category === selectedCategory;
    const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          thread.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    alert("Thread created successfully!");
    setShowNewThreadForm(false);
    setNewThreadTitle("");
    setNewThreadContent("");
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Community Forum</h1>
              <p className="text-muted-foreground">Discuss ocean hazards, preparedness, and community response</p>
            </div>
            <Button onClick={() => setShowNewThreadForm(true)} className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              New Thread
            </Button>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                className="pl-10 bg-input/50 border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="glass">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "hero" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
        
        {/* New Thread Form */}
        {showNewThreadForm && (
          <Card className="mb-8 bg-gradient-card border-border">
            <CardHeader>
              <CardTitle>Create New Discussion</CardTitle>
              <CardDescription>Share your thoughts or ask questions to the community</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateThread} className="space-y-4">
                <div>
                  <Input
                    placeholder="Thread title"
                    value={newThreadTitle}
                    onChange={(e) => setNewThreadTitle(e.target.value)}
                    required
                    className="bg-input/50 border-border"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="What would you like to discuss?"
                    rows={4}
                    value={newThreadContent}
                    onChange={(e) => setNewThreadContent(e.target.value)}
                    required
                    className="bg-input/50 border-border"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowNewThreadForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="hero">
                    Post Thread
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        
        {/* Forum Threads */}
        <div className="space-y-4">
          {filteredThreads.map((thread) => (
            <Card 
              key={thread.id} 
              className="bg-gradient-card border-border hover:bg-card/70 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/forum/thread/${thread.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {thread.avatar}
                    </div>
                    <div className="mt-2 flex flex-col items-center text-xs text-muted-foreground">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{thread.likes}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {thread.isPinned && (
                        <Badge variant="default">Pinned</Badge>
                      )}
                      <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                        {thread.title}
                      </h3>
                    </div>
                    
                    <p className="text-muted-foreground mb-3 line-clamp-2">
                      {thread.content}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span>by {thread.author}</span>
                      <span>{thread.timestamp}</span>
                      <Badge variant="secondary">{categories.find(c => c.id === thread.category)?.name}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {thread.replies}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Eye className="h-4 w-4 mr-1" />
                      {thread.views}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="mt-8 text-center">
          <Button variant="outline" className="w-full md:w-auto">
            Load More Discussions
          </Button>
        </div>
      </div>
    </div>
  );
}