// import { useEffect, useState } from 'react';
import './Home.css'
import LogInOrOut from '../LogInOrOut'
import 'bootstrap/dist/css/bootstrap.css'


const Home = () => {
    



    return (
        <main>
            <div className="home-container">
                 <div className="home-title">
                     <div className="home-greeting">
                        <h1>Communities Home Page</h1>
                        <p>Welcome to Civitas</p>
                     </div>
                 </div>
                <div className="home-cards">
                    <div >
                        <div className="logo-image"></div>  
                    </div>
                    <div className="Login">
                        
                        <div>
                            {/* <Login /> */}
                            <LogInOrOut />
                        </div>
                    </div> 
                    
            

                {/* <div className="big-cards">
                    <div className="big-card-left">
                        <div>
                            <TodoForm addTodo={addTodo}/>
                            <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo}/>
                        </div>
                    </div>
                    <div className="big-card-right">
                        <div>
                            <MailBox />
                        </div>
                    </div> */} 
                    
                </div>

            </div>
        </main>
    );
}
 
export default Home;