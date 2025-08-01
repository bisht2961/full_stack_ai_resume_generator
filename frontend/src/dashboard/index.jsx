import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import ResumeCardItem from './components/ResumeCardItem';
import {useResumeApi}  from '../hooks/useResumeApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


const Dashboard = () => {

  const [resumeList,setResumeList] = useState([]);
  const {getAllResumes,getAllResumesError} = useResumeApi();
  
  const navigation = useNavigate();
  useEffect(() => {
    const user_email = localStorage.getItem("email");
    const tokens = sessionStorage.getItem("access_token");
    const refresh_token = sessionStorage.getItem("refresh_token");
    if(!user_email || !tokens || !refresh_token){
      navigation("/auth/sign-in");
      return;
    }
    getResumesList(user_email);
  }, []);

  const getResumesList = async(user_email)=> {
    
    const emailAddress = user_email.split('@')[0];
    const res = await getAllResumes(emailAddress);
    if(res.error){
      if(res.error) {
        toast.error("Error fetching resumes. Please try again later.");
        setResumeList([]);
      }
      return;
    }
    if(res && res.data){
      setResumeList(res.data.data);
    }
  }
  const handleDelete = (deletedId) => {
    setResumeList(prevList => prevList.filter(item => item.id !== deletedId));
  };
  
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI Resume for your next job</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume />
        {resumeList.length > 0&&resumeList.map((resume,index)=>( 
          <ResumeCardItem resume={resume} key={index} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard