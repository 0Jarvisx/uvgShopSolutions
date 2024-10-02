import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaGithub,
  FaFacebook,
} from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import useApiRequest from "../Hooks/ApiRequest";


const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ icon: Icon, ...props }) => (
  <div className="relative group">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white group-hover:text-black transition-colors duration-200" />
    <input
      {...props}
      className="w-full pl-10 py-2 bg-white bg-opacity-20 border-2 border-white border-opacity-20 text-white placeholder-gray-300 rounded-xl focus:bg-opacity-30 focus:border-pink-300 transition-all duration-200"
    />
  </div>
);

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data, loading, error, sendRequest } = useApiRequest();

  useEffect(() => {
    if(user?.id) {
      navigate(user.role !== 'admin' ? '/' : '/Dashboard')
      return;
    }
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? `http://localhost:3000/api/users/login`
      : 'http://localhost:3000/api/users/';

    const body = {
      email,
      password,
      ...(isLogin ? {} : { name, phoneNumber, rol: 'client' }),
    };

    try {
      const responseData = await sendRequest(url, {
        method: 'POST',
        body: JSON.stringify(body),
      });

      if (responseData) {
        login(responseData);
        navigate(responseData.role !== 'admin' ? '/' : '/Dashboard');
      }
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400  mt-6 p-4 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div
          className="absolute inset-0 opacity-50 bg-black"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2) 0%, transparent 50%)`,
          }}
        ></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-gray-200 border-opacity-50">
            <div className="p-8">
              <motion.h2
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-center mb-8 text-gray-800"
              >
                {isLogin ? "Bienvenido" : "Regístrate"}
              </motion.h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence>
                  {!isLogin && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="text-gray-600 text-sm font-medium mb-1 block">
                          Nombre
                        </label>
                        <Input
                          icon={FaUser}
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder="John Doe"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="text-gray-600 text-sm font-medium mb-1 block">
                          Numero de Telefono
                        </label>
                        <Input
                          icon={FaUser}
                          type="phoneNumber"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                          placeholder="XXXX-XXXX"
                        />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
                <div>
                  <label className="text-gray-600 text-sm font-medium mb-1 block">
                    Email
                  </label>
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
                  <label className="text-gray-600 text-sm font-medium mb-1 block">
                    Password
                  </label>
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
                  className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 transform hover:scale-105"
                >
                  {isLogin ? "Iniciar Sesión" : "Registrarse"}
                </Button>
              </form>
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 border-opacity-50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-gray-700">
                      O Ingrese con
                    </span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {["Google", "GitHub", "Facebook"].map((provider) => (
                    <Button
                      key={provider}
                      className="bg-gray-200 bg-opacity-50 text-gray-800 hover:bg-opacity-60 border-2 border-gray-200 border-opacity-50 transform hover:scale-105 flex items-center justify-center"
                    >
                      {provider === "Google" && <FaGoogle className="mr-2" />}
                      {provider === "GitHub" && <FaGithub className="mr-2" />}
                      {provider === "Facebook" && (
                        <FaFacebook className="mr-2" />
                      )}
                      {provider}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-8 py-4 bg-gray-200 bg-opacity-30 border-t border-gray-200 border-opacity-50">
              <p className="text-sm text-center text-gray-600">
                {isLogin ? "No tienes una cuenta?" : "Ya tienes una cuenta?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-semibold text-gray-700 hover:text-gray-800 ml-1"
                >
                  {isLogin ? "Regístrate" : "Inicia Sesión"}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
