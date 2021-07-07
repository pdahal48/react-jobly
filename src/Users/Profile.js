import react, { useState, useContext} from 'react'
import {JoblyApi as API} from '../backend/helpers/api'
import UserContext from './UserContext'
import {useHistory} from 'react-router-dom'

const Profile = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const History = useHistory()

    const [signupformdata, setSignUpFormData] = useState({
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: ""
    });

    async function handleSubmit(e) {
        e.preventDefault()

        let profileData = {
            firstName: signupformdata.firstName,
            lastName: signupformdata.lastName,
            email: signupformdata.email,
            password: signupformdata.password,
        };

        let username = signupformdata.username;
        let updatedUser;

        try {
            updatedUser = await API.saveProfile(username, profileData);
          } catch (errors) {
            setSignUpFormData(errors);
            return;
        }
        setSignUpFormData(f => ({ ...f, password: "" }));
        setCurrentUser(updatedUser);
        History.push('/')
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setSignUpFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
          <h3>Profile</h3>
          <div className="card">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Username</label>
                  <p className="form-control-plaintext">{signupformdata.username}</p>
                </div>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                      name="firstName"
                      className="form-control"
                      value={signupformdata.firstName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                      name="lastName"
                      className="form-control"
                      value={signupformdata.lastName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                      name="email"
                      className="form-control"
                      value={signupformdata.email}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm password to make changes:</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={signupformdata.password}
                      onChange={handleChange}
                  />
                </div>
  
                <button
                    className="btn btn-primary btn-block mt-4"
                    onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
    );
}

export default Profile;