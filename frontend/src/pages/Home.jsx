import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Users } from 'lucide-react';
import Navbar from '../Navbar';
import ConfessionCard from '../ConfessionCard';

const Home = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      message: "I secretly love eating ice cream for breakfast.",
      author: "Anonymous",
      timestamp: "2 hours ago",
      comments: [],
      likes: 5
    },
    {
      id: 2,
      message: "I secretly hate eating ice cream for breakfast.",
      author: "Anonymous",
      timestamp: "2 hours ago",
      comments: [],
      likes: 5  
    }
    // ... other posts
  ]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [showUsersList, setShowUsersList] = useState(true);

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Navbar />

      <div className="container mx-auto px-4 pt-20 pb-8 flex">
        {/* Main Content */}
        <div className="flex-grow">
          {/* New Post Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mb-6 w-full p-4 rounded-lg border-2 border-dashed border-gray-300 
                     hover:border-purple-400 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Share Your Secret
          </motion.button>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <ConfessionCard
                key={post.id}
                post={post}
                onCommentClick={setSelectedPost}
              />
            ))}
          </div>
        </div>

        {/* Users List Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="ml-6 w-80 hidden lg:block"
        >
          <div className="sticky top-24 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5" />
              <h3 className="font-semibold">Online Users</h3>
            </div>
            {/* Add users list here */}
            <div className="space-y-2">
              {['User 1', 'User 2', 'User 3'].map((user, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 hover:bg-purple-50 rounded-lg cursor-pointer"
                >
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>{user}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
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

export default Home;