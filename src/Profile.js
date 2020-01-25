import React from 'react';
import { withRouter } from 'react-router-dom';
const firebase = require('firebase');
const db = firebase.firestore()
class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            userData: {},
            media: null,
            loading: true,
            noUser: false
        }
    }

    componentDidMount() {
        let username = this.props.match.params.username;
        db.collection('users').doc(username).get()
            .then(doc => {
                if (doc.exists) {
                    console.log(doc.data())
                    this.setState({ userData: doc.data().userData, media: doc.data().media, loading: false,noUser:false })
                }
                else {
                    this.setState({noUser:true, loading:false})
                    console.log('user doesnot exists')
                }
            })
            .catch(error => console.log(error))
    }
    render() {
        if (this.state.loading === true) {
            return (
                <div className='auth-loading'>
                    <img src={require('./images/insta.png')} alt="" />
                    <p>Fetching Data from database.</p>
                </div>
            )
        }
        else if(this.state.loading === false && this.state.noUser === true) {
            return (
                <div className='auth-loading'>
                    <img src={require('./images/insta.png')} alt=""/>
                    <p>Oops! No User Found. Please check URL.</p>
            </div>
            )
        }
        else {
            return (
                <div>
                    <nav className='navbar' style={{ backgroundColor: 'black' }}>
                        <div className='logo-sec'>
                            <img id='logo' src={require('./images/insta.png')} alt="" />
                            <img id='name' src={require('./images/insta-name.png')} alt="" />
                        </div>
                        <div className='account-type'>
                            Account Type : {this.state.userData.account_type}
                        </div>
                    </nav>
                    <div className='main'>
                        <div className="acc-info">
                            <div className='profile-pic-sec'>
                                <img id='profile-pic' src={this.state.media[0].media_url} alt="Profile pic  " />
                            </div>
                            <div className='profile-info-sec'>
                                <p>{this.state.userData.username}</p>
                                <p>User Id : {this.state.userData.id}</p>
                                <p>{this.state.userData.media_count} &nbsp; Posts </p>
                            </div>
                        </div>
                        <div className='share-links'>
                            Share Profile Via :-

                            <a className="share-btn twitter" href={`https://twitter.com/share?url=https://localhost:3000/users/${this.state.userData.username}&text=Hey! this is my insta display profile`}>
                                Twitter
                            </a>

                            <a className="share-btn facebook" href={`https://www.facebook.com/sharer.php?u=https://localhost:3000/users/${this.state.userData.username}`}>
                                Facebook
                            </a>


                            <a className="share-btn reddit" href={`https://reddit.com/submit?url=https://localhost:3000/users/${this.state.userData.username}&title=My Insta display Profile`}>
                                Reddit
                            </a>

                            <a className="share-btn linkedin" href={`http://www.linkedin.com/shareArticle?mini=true&amp;url=https://localhost:3000/users/${this.state.userData.username}&title=My Insta display profile&summary=Here is a link to my insta display profile`}>
                                LinkedIn
                            </a>


                            <a className="share-btn email" href={`mailto:?subject=My Insta display profile&body=https://localhost:3000/users/${this.state.userData.username}`}>
                                Email
                            </a>
                        </div>
                        <div className='posts'>
                            {this.state.media.map(data => {
                                return (
                                    <div>
                                        <img className='post-image' src={data.media_url} alt='Posts' />
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default withRouter(Profile);