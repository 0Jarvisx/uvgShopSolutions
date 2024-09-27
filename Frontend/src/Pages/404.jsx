import { motion } from 'framer-motion'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

export default function Error() {
  const [isGlitching, setIsGlitching] = useState(false)
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  const handleGoHome = () => {
    navigate(user.role === 'admin' ? '/Dashboard' :'/');
  }

  const glitchVariants = {
    normal: { x: 0, y: 0 },
    glitch: { x: [-2, 2, -2, 0], y: [2, -2, 2, 0], transition: { duration: 0.2 } }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <motion.h1 
        className="text-9xl font-bold mb-8"
        variants={glitchVariants}
        animate={isGlitching ? "glitch" : "normal"}
      >
        <span className="inline-block">4</span>
        <motion.span 
          className="inline-block"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          0
        </motion.span >
        <span className="inline-block">4</span>
      </motion.h1>
      <p className="text-2xl mb-8">Oops! Algo no salió bien</p>
      <motion.button
        className="px-6 py-3 bg-blue-600 rounded-full text-lg font-semibold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0.7)', '0 0 0 20px rgba(59, 130, 246, 0)'],
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
        onClick={handleGoHome}
      >
        INICIO
      </motion.button>
    </div>
  )
}