import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ConfessionCard = ({ post, onCommentClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-all cursor-pointer bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{post.author}</span>
            <span className="text-xs text-gray-400">{post.timestamp}</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <p className="text-gray-800">{post.message}</p>
        </CardContent>
        
        <CardFooter className="justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Heart className="h-4 w-4" /> {post.likes || 0}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onCommentClick(post)}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="ml-1">{post.comments.length}</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ConfessionCard;