import React from 'react';
import db from './firebase-config';
import axios from 'axios'
import keys from './config/keys'

class Auth extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true
        }
    }
    async setUser(username) {
        await localStorage.setItem('currentUser', username);
    }

    componentDidMount() {
        const code = window.location.search.substring(6);
        this.setState({ code })
        var formdata = new FormData();

        formdata.append("client_id", keys.instagram.client_id)
        formdata.append('client_secret', keys.instagram.client_secret)
        formdata.append('grant_type', 'authorization_code')
        formdata.append('redirect_uri', keys.instagram.redirect_uri)
        formdata.append('code', code)

        //get access token

        axios.post('https://api.instagram.com/oauth/access_token', formdata,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(res => {
                console.log(res.data.user_id)

                //get user data

                axios.get(`https://graph.instagram.com/me?fields=id,username,media_count,account_type&access_token=${res.data.access_token}`)
                    .then(res => {
                        console.log(res.data)
                        this.setUser(res.data.username)

                        //add user details to database

                        db.collection('users').doc(res.data.username).set({
                            userData: res.data,
                            media: null
                        })
                            .then(() => console.log('user data added to database'))
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.error(err.response.data))

                //getting media

                axios.get(`https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,thumbnail_url,timestamp&access_token=${res.data.access_token}`)
                    .then(async res => {
                        console.log(res.data)
                        const username = await localStorage.getItem('currentUser')
                        console.log(username)

                        //add media data to data base

                        db.collection('users').doc(username).update({
                            media: res.data.data
                        })
                            .then(() => {
                                console.log('media added to database');
                                window.location.replace(`/users/${username}`)
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err.response.data))
            })
            .catch(err => console.log(err.response.data))
    }
    render() {
        return (
            <div className='auth-loading'>
                    <img src={require('./images/insta.png')} alt=""/>
                    <p>Fetching Data from Instagram....</p>
            </div>
        )
    }
}

export default Auth;