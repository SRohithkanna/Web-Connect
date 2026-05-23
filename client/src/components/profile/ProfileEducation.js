import React from 'react';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description }
}) => (
  <div>
    <h3>{school}</h3>
    <p>
      {new Date(from).toLocaleDateString()} -{' '}
      {!to ? 'Now' : new Date(to).toLocaleDateString()}
    </p>
    <p>
      <strong>Degree: </strong>
      {degree}
    </p>
    <p>
      <strong>Field Of Study: </strong>
      {fieldofstudy}
    </p>
    {description && (
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    )}
  </div>
);

export default ProfileEducation;