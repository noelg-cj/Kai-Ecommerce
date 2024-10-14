import React from 'react'
import bag from "../../assets/BAG.png"
import ItemCard from '../../Components/ItemCard'
import Navbar from '../../Components/Navbar'

const Shop = () => {
  return (
    <div className='font-Satoshi bg-[#E6E6FA]'>
      <Navbar />
      <div className='p-4 px-12'>
        <h3 className='text-4xl font-bold mb-4'>Shop</h3>
        <div className='flex flex-wrap gap-5'>
          <ItemCard img={bag} name="Bag" desc="Lorem ipsum dolor sit amet consectetur. Nunc mi velit ut ut. Nisl tempus faucibus imperdiet..." price="100" />
          <ItemCard img={bag} name="Bag" desc="Lorem ipsum dolor sit amet consectetur. Nunc mi velit ut ut. Nisl tempus faucibus imperdiet..." price="100" />
          <ItemCard img={bag} name="Bag" desc="Lorem ipsum dolor sit amet consectetur. Nunc mi velit ut ut. Nisl tempus faucibus imperdiet..." price="100" />
          <ItemCard img={bag} name="Bag" desc="Lorem ipsum dolor sit amet consectetur. Nunc mi velit ut ut. Nisl tempus faucibus imperdiet..." price="100" />
          <ItemCard img={bag} name="Bag" desc="Lorem ipsum dolor sit amet consectetur. Nunc mi velit ut ut. Nisl tempus faucibus imperdiet..." price="100" />
          <ItemCard img={bag} name="Bag" desc="Lorem ipsum dolor sit amet consectetur. Nunc mi velit ut ut. Nisl tempus faucibus imperdiet..." price="100" />
        </div>
      </div>
    </div>
  )
}

export default Shop