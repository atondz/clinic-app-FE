import React from 'react';
import { Stethoscope, Users, Clock } from 'lucide-react';
import 'tailwindcss/tailwind.css';

const ClinicLanding = () => {
  return (
    <div className="min-h-screen bg-gray-100">
     {/* Unified Header */}
<header className="w-full bg-blue-700 shadow-lg fixed top-0 left-0 z-50 py-3">
  <div className="container mx-auto flex justify-between items-center px-6">
    {/* Logo */}
    <h1 className="text-2xl font-bold text-blue">Clinic</h1>
    

    {/* Login/Register Buttons */}
    <div className="flex space-x-4 ml-auto justify-end">
      <a href="auth/login" className="bg-yellow-400 text-black px-5 py-2 rounded-full hover:bg-yellow-500 transition font-semibold shadow-md">
        Login
      </a>
      <a href="auth/register" className="bg-yellow-400 text-black px-5 py-2 rounded-full hover:bg-yellow-500 transition font-semibold shadow-md">
      Register
      </a>
    </div>
  </div>
</header>


      {/* Hero Section */}
      <div className="relative h-screen flex flex-col justify-center items-center text-center pt-32 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 drop-shadow-lg">Clinic Management System</h1>
        <p className="text-lg mt-4 mb-6 text-gray-600 max-w-2xl">Your Health, Our Priority – Comprehensive care at your fingertips.</p>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 shadow-lg -mt-20 rounded-t-xl relative container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <Stethoscope className="mx-auto text-blue-600" size={50} />
            <h2 className="text-4xl font-bold">20+</h2>
            <p className="text-gray-600 text-lg">Medical Specialists</p>
          </div>
          <div>
            <Users className="mx-auto text-blue-600" size={50} />
            <h2 className="text-4xl font-bold">15k+</h2>
            <p className="text-gray-600 text-lg">Satisfied Patients</p>
          </div>
          <div>
            <Clock className="mx-auto text-blue-600" size={50} />
            <h2 className="text-4xl font-bold">24/7</h2>
            <p className="text-gray-600 text-lg">Medical Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicLanding;
