import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({ createProfile, getCurrentProfile, profile: { profile } }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '', website: '', location: '', status: '',
    skills: '', githubusername: '', bio: '',
    twitter: '', facebook: '', linkedin: '', youtube: '', instagram: ''
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();
    if (profile) {
      setFormData({
        company: profile.company || '',
        website: profile.website || '',
        location: profile.location || '',
        status: profile.status || '',
        skills: profile.skills ? profile.skills.join(', ') : '',
        githubusername: profile.githubusername || '',
        bio: profile.bio || '',
        twitter: profile.social?.twitter || '',
        facebook: profile.social?.facebook || '',
        linkedin: profile.social?.linkedin || '',
        youtube: profile.social?.youtube || '',
        instagram: profile.social?.instagram || ''
      });
    }
  }, [getCurrentProfile]);

  const { company, website, location, status, skills, githubusername,
    bio, twitter, facebook, linkedin, youtube, instagram } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, true);
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Edit Your Profile</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option value="0">* Select Status</option>
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
          <input type="text" placeholder="Skills" name="skills" value={skills} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Github Username" name="githubusername" value={githubusername} onChange={onChange} />
        </div>
        <div className="form-group">
          <textarea placeholder="Bio" name="bio" value={bio} onChange={onChange} />
        </div>
        <div className="my-2">
          <button type="button" className="btn btn-light" onClick={() => toggleSocialInputs(!displaySocialInputs)}>
            Social Links
          </button>
        </div>
        {displaySocialInputs && (
          <>
            <div className="form-group"><input type="text" placeholder="Twitter" name="twitter" value={twitter} onChange={onChange} /></div>
            <div className="form-group"><input type="text" placeholder="Facebook" name="facebook" value={facebook} onChange={onChange} /></div>
            <div className="form-group"><input type="text" placeholder="LinkedIn" name="linkedin" value={linkedin} onChange={onChange} /></div>
            <div className="form-group"><input type="text" placeholder="YouTube" name="youtube" value={youtube} onChange={onChange} /></div>
            <div className="form-group"><input type="text" placeholder="Instagram" name="instagram" value={instagram} onChange={onChange} /></div>
          </>
        )}
        <input type="submit" className="btn btn-primary my-1" value="Update" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </section>
  );
};

const mapStateToProps = (state) => ({ profile: state.profile });
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(EditProfile);