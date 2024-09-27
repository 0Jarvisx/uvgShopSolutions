import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';

// Custom Button component
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Custom Input component
const Input = ({ icon: Icon, ...props }) => (
  <div className="relative group">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white group-hover:text-pink-300 transition-colors duration-200" />
    <input
      {...props}
      className="w-full pl-10 py-2 bg-white bg-opacity-20 border-2 border-white border-opacity-20 text-white placeholder-gray-300 rounded-xl focus:bg-opacity-30 focus:border-pink-300 transition-all duration-200 outline-none"
    />
  </div>
);

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? 'Logging in' : 'Signing up', { email, password, name });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4 overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2) 0%, transparent 50%)`
        }}
      ></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white border-opacity-20">
          <div className="p-8">
            <motion.h2 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-center mb-8 text-white"
            >
              {isLogin ? 'Welcome Back' : 'Join Us'}
            </motion.h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="text-white text-sm font-medium mb-1 block">Name</label>
                    <Input
                      icon={FaUser}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="John Doe"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <div>
                <label className="text-white text-sm font-medium mb-1 block">Email</label>
                <Input
                  icon={FaEnvelope}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-1 block">Password</label>
                <Input
                  icon={FaLock}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transform hover:scale-105"
              >
                {isLogin ? 'Log In' : 'Sign Up'}
              </Button>
            </form>
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white border-opacity-20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">Or continue with</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {['Google', 'GitHub', 'Facebook'].map((provider) => (
                  <Button
                    key={provider}
                    className="bg-white bg-opacity-20 text-white hover:bg-opacity-30 border-2 border-white border-opacity-20 transform hover:scale-105 flex items-center justify-center"
                  >
                    {provider === 'Google' && <FaGoogle className="mr-2" />}
                    {provider === 'GitHub' && <FaGithub className="mr-2" />}
                    {provider === 'Facebook' && <FaFacebook className="mr-2" />}
                    {provider}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="px-8 py-4 bg-white bg-opacity-10 border-t border-white border-opacity-20">
            <p className="text-sm text-center text-white">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-semibold text-pink-300 hover:text-pink-400 ml-1"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}