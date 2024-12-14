import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); 
  const [loadingState, setLoadingState] = useState({ data: null, error: false, isLoading: true });

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoadingState({ data: { message: "Hello, World!" }, error: false, isLoading: false });
    }, 2000);
  }, []);

  const { data, error, isLoading } = loadingState;
  if (isLoading) return <></>;
  if (error) {
    console.log(error);
    navigate(`/501`);
  }

console.log(data);
  return (
    <>
    <h1 className='text-light'>TOP OF THE WEEK!</h1>
    </>
  )
}

export default Home