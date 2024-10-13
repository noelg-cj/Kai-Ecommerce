import React from 'react'
import Bag from "../../assets/BAG.png"

const Landing = () => {
  return (
    <div className='p-8'>
        <div className='bg-[#CFDBE5] p-24 flex justify-between'>
            <div>
                <h1 className='text-5xl font-bold leading-snug'>
                    Where <span className='text-primary'>College</span><br /> Deals Come to Life
                </h1>
                <p className='w-[30rem] mt-5'>
                    Lorem ipsum dolor sit amet consectetur. Nunc mi velit ut ut. Nisl tempus faucibus imperdiet sodales. Risus sem semper placerat vestibulum quisque blandit. Nibh condimentum quam dui arcu volutpat venenatis velit.
                </p>
                <button className='bg-black text-white px-5 py-2 mt-5'>See Products</button>
            </div>
            <div>
                <img src={Bag} className='w-[450px] mr-28 -mt-20' />
            </div>
        </div>
    </div>
  )
}

export default Landing