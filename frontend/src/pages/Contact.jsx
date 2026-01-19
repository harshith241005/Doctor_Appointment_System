import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Visit Us',
      details: ['MediBook Healthcare Solutions', 'Hyderabad, Telangana', 'India - 500001']
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 87654 32109', 'Mon - Sat, 9AM - 8PM']
    },
    {
      icon: '✉️',
      title: 'Email Us',
      details: ['contact@medibook.com', 'support@medibook.com', 'careers@medibook.com']
    }
  ];

  return (
    <div className='py-10'>
      {/* Header Section */}
      <section className='text-center mb-16'>
        <span className='inline-block px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-medium mb-4'>
          Get In Touch
        </span>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
          We'd Love to <span className='text-primary'>Hear From You</span>
        </h1>
        <p className='text-gray-600 max-w-2xl mx-auto'>
          Have questions about our services? Need help booking an appointment? 
          Our team is here to assist you 24/7.
        </p>
      </section>

      {/* Contact Cards */}
      <section className='grid md:grid-cols-3 gap-6 mb-16'>
        {contactInfo.map((item, idx) => (
          <div key={idx} className='bg-white p-8 rounded-2xl shadow-card text-center hover:shadow-card-hover transition-all'>
            <span className='text-4xl mb-4 block'>{item.icon}</span>
            <h3 className='text-xl font-bold text-gray-800 mb-4'>{item.title}</h3>
            {item.details.map((detail, i) => (
              <p key={i} className='text-gray-600'>{detail}</p>
            ))}
          </div>
        ))}
      </section>

      {/* Contact Form & Map */}
      <section className='grid lg:grid-cols-2 gap-12'>
        {/* Form */}
        <div className='bg-white p-8 md:p-12 rounded-2xl shadow-card'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>Send us a Message</h2>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-gray-700 font-medium mb-2'>Your Name</label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all'
                  placeholder='John Doe'
                  required
                />
              </div>
              <div>
                <label className='block text-gray-700 font-medium mb-2'>Email Address</label>
                <input
                  type='email'
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all'
                  placeholder='john@example.com'
                  required
                />
              </div>
            </div>
            <div>
              <label className='block text-gray-700 font-medium mb-2'>Subject</label>
              <input
                type='text'
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all'
                placeholder='How can we help?'
                required
              />
            </div>
            <div>
              <label className='block text-gray-700 font-medium mb-2'>Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows='5'
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none'
                placeholder='Tell us more about your inquiry...'
                required
              ></textarea>
            </div>
            <button
              type='submit'
              className='w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all duration-300'
            >
              Send Message →
            </button>
          </form>
        </div>

        {/* Image & Info */}
        <div className='flex flex-col justify-center'>
          <img className='w-full rounded-2xl shadow-xl mb-8' src={assets.contact_image} alt='Contact MediBook' />
          <div className='bg-gradient-to-r from-primary to-emerald-500 text-white p-8 rounded-2xl'>
            <h3 className='text-xl font-bold mb-4'>Join Our Team</h3>
            <p className='text-white/90 mb-4'>
              We're always looking for talented individuals to join our growing team. 
              Check out our open positions and be part of the healthcare revolution.
            </p>
            <button className='bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all'>
              View Careers
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
