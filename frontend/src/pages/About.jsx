import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  const stats = [
    { number: '500+', label: 'Expert Doctors' },
    { number: '50K+', label: 'Happy Patients' },
    { number: '20+', label: 'Specialties' },
    { number: '99%', label: 'Success Rate' }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Excellence',
      desc: 'We strive for excellence in every aspect of healthcare delivery, ensuring top-quality medical services.'
    },
    {
      icon: '🤝',
      title: 'Trust',
      desc: 'Building lasting relationships with our patients through transparency, reliability, and honest communication.'
    },
    {
      icon: '❤️',
      title: 'Compassion',
      desc: 'We treat every patient with empathy, understanding, and genuine care for their well-being.'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      desc: 'Leveraging cutting-edge technology to provide seamless and efficient healthcare experiences.'
    }
  ];

  return (
    <div className='py-10'>
      {/* Hero Section */}
      <section className='text-center mb-16'>
        <span className='inline-block px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-medium mb-4'>
          About MediBook
        </span>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
          Transforming Healthcare,
          <br />
          <span className='text-primary'>One Appointment at a Time</span>
        </h1>
        <p className='text-gray-600 max-w-3xl mx-auto text-lg'>
          Founded with a vision to make quality healthcare accessible to everyone, 
          MediBook connects patients with the best doctors across the country.
        </p>
      </section>

      {/* Stats Section */}
      <section className='bg-gradient-to-r from-primary to-emerald-500 rounded-3xl py-12 px-8 mb-16'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          {stats.map((stat, idx) => (
            <div key={idx} className='text-center'>
              <h3 className='text-4xl md:text-5xl font-bold text-white mb-2'>{stat.number}</h3>
              <p className='text-white/80'>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className='grid md:grid-cols-2 gap-12 items-center mb-16'>
        <div>
          <img
            className='w-full rounded-2xl shadow-xl'
            src={assets.about_image}
            alt='About MediBook'
          />
        </div>
        <div>
          <span className='text-primary font-semibold'>Our Story</span>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-6'>
            Built by Patients, for Patients
          </h2>
          <p className='text-gray-600 leading-relaxed mb-4'>
            MediBook was born from a simple frustration — the difficulty of finding and booking 
            appointments with quality doctors. As a developer and someone who values efficiency, 
            I created this platform to solve that problem.
          </p>
          <p className='text-gray-600 leading-relaxed mb-4'>
            Today, MediBook serves thousands of patients, helping them connect with verified 
            healthcare professionals across multiple specialties. Our platform ensures that 
            quality healthcare is just a few clicks away.
          </p>
          <p className='text-gray-600 leading-relaxed'>
            We're committed to continuous innovation, always improving our services to better 
            serve our growing community of patients and healthcare providers.
          </p>
          <div className='mt-6 p-4 bg-gray-50 rounded-xl border-l-4 border-primary'>
            <p className='text-gray-700 italic'>"Healthcare should be accessible, affordable, and efficient for everyone."</p>
            <p className='text-primary font-semibold mt-2'>- Harsh, Founder & Developer</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='mb-16'>
        <div className='text-center mb-12'>
          <span className='text-primary font-semibold'>Our Values</span>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mt-2'>
            What We <span className='text-primary'>Stand For</span>
          </h2>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {values.map((item, idx) => (
            <div
              key={idx}
              className='bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 text-center group hover:-translate-y-1'
            >
              <span className='text-4xl mb-4 block'>{item.icon}</span>
              <h4 className='text-xl font-bold text-gray-800 mb-3'>{item.title}</h4>
              <p className='text-gray-600 text-sm'>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-gray-900 text-white rounded-3xl p-12 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold mb-4'>Ready to Experience Better Healthcare?</h2>
        <p className='text-gray-400 mb-8 max-w-2xl mx-auto'>
          Join thousands of satisfied patients who trust MediBook for their healthcare needs.
        </p>
        <button className='bg-primary text-white px-10 py-4 rounded-full font-semibold hover:bg-primary-dark transition-all'>
          Book Your First Appointment
        </button>
      </section>
    </div>
  )
}

export default About