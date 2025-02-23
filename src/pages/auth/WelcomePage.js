import React from 'react';
import { Stethoscope, Users, Clock } from 'lucide-react';

const ClinicLanding = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/api/placeholder/1920/1080")',
            backgroundPosition: 'center 30%'
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-6 pt-20 text-center">
          <h2 className="text-xl text-white bg-black/30 px-4 py-2 rounded-lg inline-block drop-shadow-lg">
            Your Health, Our Priority – The Ultimate Clinic Management Solution!
          </h2>
        </div>
      </div>
              
      {/* Stats Cards - Always in Row */}
      <div class="container mt-8 pb-5">
  <div class="row justify-content-center">
    <div class="col-md-4 text-center">
      <div class="p-4 bg-light rounded shadow">
        <i class="bi bi-stethoscope fs-2 text-primary"></i>
        <h2 class="h1">20+</h2>
        <p>Medical Specialists</p>
      </div>
    </div>

    <div class="col-md-4 text-center">
      <div class="p-4 bg-light rounded shadow">
        <i class="bi bi-people fs-2 text-primary"></i>
        <h2 class="h1">15k+</h2>
        <p>Satisfied Patients</p>
      </div>
    </div>

    <div class="col-md-4 text-center">
      <div class="p-4 bg-light rounded shadow">
        <i class="bi bi-clock fs-2 text-primary"></i>
        <h2 class="h1">24/7</h2>
        <p>Medical Support</p>
      </div>
    </div>
  </div>
</div>


      
      
    </div>
  );
};

export default ClinicLanding;
