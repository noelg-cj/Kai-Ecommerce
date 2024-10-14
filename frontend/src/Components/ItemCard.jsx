import React from 'react'

const ItemCard = ({ img, name, desc, price }) => {
  return (
    <div className='h-[450px] w-[320px] p-4 rounded-md border border-slate-700 flex flex-col justify-between'>
      <img src={img} alt={name} className='w-[200px] mx-auto' />
      <div>
          <div className='w-full'>
            <h4 className='text-3xl mt-3 font-medium'>{name}</h4>
            <p className='text-sm mt-3'>{desc}</p>
          </div>
          <div className='flex justify-between mt-5'>
            <p className='text-xl'>${price}</p>
            <button className='bg-black text-white px-5 py-2'>Buy Now</button>
          </div>
      </div>
    </div>
  )
}

export default ItemCard