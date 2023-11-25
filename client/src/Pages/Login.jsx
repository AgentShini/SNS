import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Context';
import dotenv from 'dotenv';
dotenv.config();
export default function Login(){
  const SERVER = process.env.SERVER

    const {Refresh,SetUsername, SetUsernameState} = useContext(DataContext)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`${SERVER}/chat/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include', // Include credentials in the request
          });
    
          if (response.status === 200) {
            const userObject = {
              username: username,
              checkin: Date.now(),
            };
            localStorage.setItem('userSession', JSON.stringify(userObject));
            SetUsername(username)
            SetUsernameState()
            Refresh()
            alert("Welcome")
            navigate(`/`)
        } else {
            // Registration failed, handle the error response
            const errorData = await response.json();
            alert(errorData.message)
            console.error('Login error:', errorData.message);
          }
        } catch (error) {
          console.error('Login error:', error.message);
        }
      };
 

return(
<section className="bg-gray-700 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
     Chatify   
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="******" required=""/>
                  </div>
                  
                  <button type="submit" className="w-full text-gray-500 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet?
                      <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to="/signup"> Signup here</Link>

                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
)
}
