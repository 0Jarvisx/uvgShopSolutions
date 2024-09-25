import { useState } from "react";
import { FormComponent } from "./../Components/Form";
import { useNavigate } from "react-router-dom";

export default function AuthForms() {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  
  const loginFields = [
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
  ];

  const signupFields = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
  ];

  const handleSubmit = (formData) => {
    console.log(`${activeTab} form submitted`, formData);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex">
            <button
              className={`w-1/2 py-2 px-4 focus:outline-none ${
                activeTab === "login"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`w-1/2 py-2 px-4 focus:outline-none ${
                activeTab === "signup"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </button>
          </div>
          <div className="p-6">
            {activeTab === "login" ? (
              <FormComponent fields={loginFields} onSubmit={handleSubmit} />
            ) : (
              <FormComponent fields={signupFields} onSubmit={handleSubmit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
