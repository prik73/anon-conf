import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {UserPlus,ShieldCheck,Wand2,Rocket,Feather, Mail} from "lucide-react";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const navigate = useNavigate();

  const handleSignup =  async (e) => {
    e.preventDefault();
    setAnimationTrigger(prev => (prev + 1) % 4);
    try {
      const response = await axios.post('/api/signup', { username, password }); // Relative URL
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Something went wrong!');
    }

  };

  const signupHints = [
    "Crafting Your Secret Identity...",
    "Unleashing Your Mysterious Persona!",
    "Secrets Initialized!",
    "Welcome to the Sanctuary!"
  ];

  const signupIcons = [Wand2, Rocket, ShieldCheck, Feather];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-full max-w-4xl"
      >
        <Card className="grid grid-cols-3 shadow-2xl border-2 border-purple-200/50 overflow-hidden">
          <div className="col-span-1 bg-purple-500/10 flex flex-col justify-center items-center p-10 text-center relative">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="cursor-pointer"
            >
              <UserPlus 
                className="text-purple-600 mb-4" 
                size={64} 
              />
            </motion.div>
            <h2 className="text-2xl font-bold text-purple-800 mb-2">
              Identity Forge
            </h2>
            <p className="text-purple-600">
              Craft Your Anonymous Persona
            </p>
            {animationTrigger > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-4 flex items-center text-purple-500"
              >
                {React.createElement(signupIcons[animationTrigger - 1], { className: "mr-2" })}
                <span>{signupHints[animationTrigger - 1]}</span>
              </motion.div>
            )}
          </div>

          <CardContent className="col-span-2 p-10 flex flex-col justify-center">
            <form onSubmit={handleSignup} className="space-y-6">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-purple-600" />
                <Input 
                  type="text" 
                  placeholder="Choose Your Secret Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 border-purple-300 focus:ring-purple-500"
                  required
                />
              </motion.div>
              {/* <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative group"
              >
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-purple-600" />
                <Input 
                  type="email" 
                  placeholder="Anonymous Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-purple-300 focus:ring-purple-500"
                  required
                />
              </motion.div> */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative group"
              >
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-purple-600" />
                <Input 
                  type="password" 
                  placeholder="Unbreakable Passphrase" 
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
                  Forge Identity
                </Button>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-sm text-purple-600"
              >
                Already have a secret? {' '}
                <span 
                  onClick={() => navigate('/login')}
                  className="font-bold cursor-pointer hover:underline"
                >
                  Login
                </span>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Signup;