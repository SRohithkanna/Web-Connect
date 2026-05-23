import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Profile = ({ getProfileById, profile: { profile }, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return (
    <div className="profile-page my-1">
      {profile === null ? (
        <Spinner />
      ) : (
        <>
          <div className="profile bg-light">
            <div>
              {profile.user && (
                <>
                  <img src={profile.user.avatar} alt="" className="round-img" />
                  <h2>{profile.user.name}</h2>
                  <p>{profile.status} {profile.company && <span>at {profile.company}</span>}</p>
                  <p className="my-1">{profile.location && <span>{profile.location}</span>}</p>
                  {profile.bio && (
                    <p>{profile.bio}</p>
                  )}
                  <div className="icons my-1">
                    {profile.social && profile.social.twitter && (
                      <a href={`https://twitter.com/${profile.social.twitter}`} target="_blank" rel="noopener noreferrer" className="btn btn-blue">
                        <i className="fab fa-twitter fa-2x"></i>
                      </a>
                    )}
                    {profile.social && profile.social.facebook && (
                      <a href={`https://facebook.com/${profile.social.facebook}`} target="_blank" rel="noopener noreferrer" className="btn btn-blue">
                        <i className="fab fa-facebook fa-2x"></i>
                      </a>
                    )}
                    {profile.social && profile.social.linkedin && (
                      <a href={`https://linkedin.com/in/${profile.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="btn btn-blue">
                        <i className="fab fa-linkedin fa-2x"></i>
                      </a>
                    )}
                    {profile.social && profile.social.youtube && (
                      <a href={`https://youtube.com/${profile.social.youtube}`} target="_blank" rel="noopener noreferrer" className="btn btn-blue">
                        <i className="fab fa-youtube fa-2x"></i>
                      </a>
                    )}
                    {profile.social && profile.social.instagram && (
                      <a href={`https://instagram.com/${profile.social.instagram}`} target="_blank" rel="noopener noreferrer" className="btn btn-blue">
                        <i className="fab fa-instagram fa-2x"></i>
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="profile-exp bg-white p-2 my-2">
            <h2 className="text-primary">Skills</h2>
            <div className="skills">
              {profile.skills && profile.skills.map((skill, index) => (
                <div key={index} className="p-1">
                  <i className="fas fa-check"></i> {skill}
                </div>
              ))}
            </div>
          </div>

          {profile.experience && profile.experience.length > 0 && (
            <div className="profile-exp bg-white p-2 my-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.map((exp) => (
                <div key={exp._id}>
                  <h3 className="text-dark">{exp.company}</h3>
                  <p>{exp.title}</p>
                  <p className="text-muted">
                    {new Date(exp.from).toLocaleDateString()} -
                    {exp.to === null
                      ? ' Now'
                      : ` ${new Date(exp.to).toLocaleDateString()}`}
                  </p>
                  <p>
                    <strong>Description: </strong>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {profile.education && profile.education.length > 0 && (
            <div className="profile-edu bg-white p-2 my-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.map((edu) => (
                <div key={edu._id}>
                  <h3>{edu.school}</h3>
                  <p>{edu.degree} in {edu.fieldofstudy}</p>
                  <p className="text-muted">
                    {new Date(edu.from).toLocaleDateString()} -
                    {edu.to === null
                      ? ' Now'
                      : ` ${new Date(edu.to).toLocaleDateString()}`}
                  </p>
                  {edu.description && (
                    <p>
                      <strong>Description: </strong>
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
