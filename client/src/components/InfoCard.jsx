import React from 'react'
import Navbar from '@/components/Navbar'
import ModernStore from '@/pages/ModernStore'
// import Cards from './cards'

const HelmetsCards = () => {
  const fullhelmets = [
    { id: 1, name: 'AGV', price: '₹89,500', image: '/fh1.jpg' },
    { id: 2, name: 'Vega Dark', price: '₹14,999', image: '/fh2.jpg' },
    { id: 3, name: 'MT THUNDER 5', price: '₹9999', image: '/fh3.jpg' },
    { id: 4, name: 'STUDDS TROOPER D3', price: '₹17,899', image: '/fh4.jpg' },
    { id: 5, name: 'Axor xBhp Bionic Helmet', price: '₹6,499', image: '/fh5.jpg' },
  ]

//   Half Face Helmet Data
    const halfhelmets = [   
    { id: 1, name: 'Half Face Helmet', price: '$89', image: '/background-section2.png' },
    { id: 2, name: 'Half Face Helmet', price: '$79', image: '/placeholder.png' },
    { id: 3, name: 'Half Face Helmet', price: '$69', image: '/placeholder.png' },
  ]

//   Convertable Helmet Data
const conhelmets = [   
    { id: 1, name: 'Convertable Helmet', price: '$159', image: '/background-section2.png' },
    { id: 2, name: 'Convertable Helmet', price: '$139', image: '/placeholder.png' },
    { id: 3, name: 'Convertable Helmet', price: '$119', image: '/placeholder.png' },
    { id: 4, name: 'Convertable Helmet', price: '$149', image: '/placeholder.png' },
  ]

  return (
    <>
      <Navbar />
      <ModernStore />
      
      <main className='ml-56 pt-24 px-6'>
        <div className='container mx-auto'>
          <h1 className='text-3xl font-bold mb-6'>Full Face Helmets</h1>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {fullhelmets.map((fullhelmet) => (
              <div key={fullhelmet.id} className='bg-white rounded-md shadow p-4'>
                
                <img 
                    src={fullhelmet.image} 
                    alt={fullhelmet.name} 
                    className='h-60 object-cover rounded mb-3'
                    loading='lazy'
                />
                <h3 className='font-medium text-lg'>{fullhelmet.name}</h3>
                <p className='text-gray-600 mb-3'>{fullhelmet.price}</p>
                <button className='w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded'>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
    </main>

{/* Half Face Cards */}
    <main className='ml-56 pt-24 px-6'>
        <div className='container mx-auto'>
          <h1 className='text-3xl font-bold mb-6'>Half Face Helmets</h1>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {halfhelmets.map((halfhelmet) => (
              <div key={halfhelmet.id} className='bg-white rounded-md shadow p-4'>
                <img 
                    src={halfhelmet.image} 
                    alt={halfhelmet.name} 
                    className='h-40 w-full object-cover rounded mb-3'
                />

                <h3 className='font-medium text-lg'>{halfhelmet.name}</h3>
                <p className='text-gray-600 mb-3'>{halfhelmet.price}</p>
                <button className='w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded'>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Convertable  */}
      <main className='ml-56 pt-24 px-6'>
        <div className='container mx-auto'>
          <h1 className='text-3xl font-bold mb-6'>Convertable Helmets</h1>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {conhelmets.map((conhelmet) => (
              <div key={conhelmet.id} className='bg-white rounded-md shadow p-4'>
                <img 
                    src={conhelmet.image} 
                    alt={conhelmet.name} 
                    className='h-40 w-full object-cover rounded mb-3'
                />
                <h3 className='font-medium text-lg'>{conhelmet.name}</h3>
                <p className='text-gray-600 mb-3'>{conhelmet.price}</p>
                <button className='w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded'>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

      </main>
    </>
  )
}

export default HelmetsCards