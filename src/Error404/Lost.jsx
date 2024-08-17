import React from 'react'
import { Error404 } from '../images/svg/svgs'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Lost() {
  const userid = useSelector(state => state.authReducer.id);
  return (
    <div className="h-screen w-screen bg-gray-600 flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
               <div className="max-w-md">
                  <div className="text-5xl font-dark font-bold text-white">404</div>
                <p
                  className="text-2xl md:text-3xl font-light leading-normal text-Xwhite mb-2"
                >Sorry we couldn't find this page. </p>
              <p className="mb-8 text-XGraybutton">But dont worry, you can find plenty of other things on our homepage.</p>
              
              <Link className=" px-4 py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700 flex justify-center items-center" to={`/home/${userid}`}>Back to Homepage</Link>
        </div>
          <div className="max-w-lg">
          <Error404 />
        </div>
      </div>
    </div>
  )
}

export default Lost
