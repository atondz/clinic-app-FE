import React, { useState } from "react";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "Nam",
    dob: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Thêm bệnh nhân</h1>
          <div className="h-1 w-24 bg-blue-500 rounded mx-auto mt-2"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Họ và tên <span className="text-red-500">*</span></label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nhập họ và tên" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Số điện thoại <span className="text-red-500">*</span></label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Nhập số điện thoại" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Giới tính <span className="text-red-500">*</span></label>
            <div className="flex space-x-6">
              <label className="inline-flex items-center cursor-pointer">
                <input type="radio" name="gender" value="Nam" checked={formData.gender === "Nam"} onChange={handleChange} className="w-4 h-4 text-blue-600" />
                <span className="ml-3 text-gray-700">Nam</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input type="radio" name="gender" value="Nữ" checked={formData.gender === "Nữ"} onChange={handleChange} className="w-4 h-4 text-blue-600" />
                <span className="ml-3 text-gray-700">Nữ</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Ngày sinh <span className="text-red-500">*</span></label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Địa chỉ <span className="text-red-500">*</span></label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Nhập địa chỉ" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition" />
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button type="button" className="px-6 py-3 border border-gray-400 text-gray-700 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 transition">Quay lại</button>
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition">Lưu lại</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;