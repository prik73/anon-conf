import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, MessageCircleIcon } from "lucide-react";

const Home = () => {
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      message: "I secretly love eating ice cream for breakfast.", 
      author: "Anonymous",
      comments: []
    },
    { 
      id: 2, 
      message: "I've never told anyone, but I'm afraid of heights.", 
      author: "Anonymous",
      comments: []
    },
    { 
      id: 3, 
      message: "Sometimes I pretend to work when my boss walks by.", 
      author: "Anonymous",
      comments: []
    }
  ]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (selectedPost && newComment.trim()) {
      const updatedPosts = posts.map(post => 
        post.id === selectedPost.id 
          ? { ...post, comments: [...post.comments, newComment.trim()] }
          : post
      );
      setPosts(updatedPosts);
      setNewComment('');
      setSelectedPost(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Glassmorphic Header */}
      <header className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-md z-10 py-4 shadow-sm">
        <h1 className="text-center text-2xl font-bold font-mono text-gray-800">
          SECRETS / CONFESSIONS
        </h1>
      </header>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card 
              key={post.id} 
              className="hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <CardHeader>
                <CardTitle>{post.author}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{post.message}</CardDescription>
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="ghost" size="icon">
                  <MessageCircleIcon className="h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Comment Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a Comment</DialogTitle>
            <DialogDescription>
              {selectedPost?.message}
            </DialogDescription>
          </DialogHeader>
          <Textarea 
            placeholder="Your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={handleAddComment}>
              Post Comment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home