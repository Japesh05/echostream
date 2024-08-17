import React from 'react'

function TweetContent({data}) {
  const tweet = data?.tweet ||  "Welcome to Twitter";
  return (
    <div className=' px-3 py-2'>
      <pre>{tweet}</pre>
      <div className='text-XhashTag hover:underline hover:underline-offset-1'></div>
    </div>
  )
}

export default TweetContent
