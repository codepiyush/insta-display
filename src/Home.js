import React from "react";

class Home extends React.Component {
    constructor() {
        super();
        this.instaLogin = this.instaLogin.bind(this);
      }
    
    instaLogin() {
        window.location.replace("https://api.instagram.com/oauth/authorize?client_id=589865145171776&redirect_uri=https://localhost:3000/auth&scope=user_profile,user_media&response_type=code");
    }
    render() {
        return (
            <div className='insta-login'>

                <button onClick={this.instaLogin}> <img className='login-logo' src={require('./images/insta.png')} alt=""/> <p className='login-text'>Click to login with instagram</p></button>
            </div>
        )
    }
}

export default Home;