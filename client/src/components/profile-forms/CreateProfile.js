import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '', website: '', location: '', status: '',
    skills: '', githubusername: '', bio: '',
    twitter: '', facebook: '', linkedin: '', youtube: '', instagram: ''
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const { company, website, location, status, skills, githubusername,
    bio, twitter, facebook, linkedin, youtube, instagram } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate);
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">Add some info to make your profile stand out</p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills (comma separated)" name="skills" value={skills} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Github Username" name="githubusername" value={githubusername} onChange={onChange} />
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio about yourself" name="bio" value={bio} onChange={onChange} />
        </div>
        <div className="my-2">
          <button type="button" className="btn btn-light" onClick={() => toggleSocialInputs(!displaySocialInputs)}>
            Add Social Network Links
          </button>
        </div>
        {displaySocialInputs && (
          <>
            <div className="form-group">
              <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange} />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange} />
            </div>
            <div className="form-group">
              <input type="text" placeholder="LinkedIn URL" name="linkedin" value={linkedin} onChange={onChange} />
            </div>
            <div className="form-group">
              <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange} />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange} />
            </div>
          </>
        )}
        <input type="submit" className="btn btn-primary my-1" value="Submit" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </section>
  );
};

export default connect(null, { createProfile })(CreateProfile);