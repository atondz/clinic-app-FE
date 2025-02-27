import React from 'react'
import Header from "../../components/Headers/Header";
import PatientList from "components/Tables/PatientList.js";

const Patient = () => {
  return (
    <div>
      <Header />
      <PatientList/>
    </div>
  )
}

export default Patient