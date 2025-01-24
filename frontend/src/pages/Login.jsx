import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle2, KeyRound, Laugh, Egg, Sparkles } from "lucide-react";
import Signup from "./Signup.jsx";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [easterEggTriggered, setEasterEggTriggered] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const triggerEasterEgg = () => {
    setEasterEggTriggered(true);
    setTimeout(() => setEasterEggTriggered(false), 2000);
  };
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20 
        }}
        className="w-full max-w-xl"
      >
        <Card className="grid grid-cols-2 shadow-2xl border-2 border-purple-200/50">
          {/* Left Side - Decorative */}
          <div className="bg-purple-500/10 flex flex-col justify-center items-center p-8 text-center">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Laugh className="text-purple-600 mb-4" size={64} />
            </motion.div>
            <h2 className="text-xl font-bold text-purple-800 mb-2">
            Unleash Your Secrets
            
            </h2>
            <p className="text-purple-600 text-sm">
            Where whispers become stories
            </p>
          </div>

          {/* Right Side - Login Form */}
          <CardContent className="p-8 flex flex-col justify-center">
            <form onSubmit={handleLogin} className="space-y-4">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                <Input 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 border-purple-300 focus:ring-purple-500"
                  required
                />
              </motion.div>
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                <Input 
                  type="password" 
                  placeholder="Secret Passphrase" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-purple-300 focus:ring-purple-500"
                  required
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Reveal Secrets
                </Button>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center text-sm text-purple-600"
              >
                New here? 
                <motion.span 
                  whileHover={{ scale: 1.1 }}
                  className="ml-1 font-bold cursor-pointer hover:underline flex items-center"
                  onClick={() => navigate('/signup')}
                >
                  Create a Mysterious Identity
                  <Egg className="ml-1 h-4 w-4" />
                </motion.span>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Login;