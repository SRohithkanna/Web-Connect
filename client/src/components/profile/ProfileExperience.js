import React from 'react';

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description }
}) => (
  <div>
    <h3 className="text-dark">{company}</h3>
    <p>
      {new Date(from).toLocaleDateString()} -{' '}
      {!to ? 'Now' : new Date(to).toLocaleDateString()}
    </p>
    <p>
      <strong>Position: </strong>
      {title}
    </p>
    {location && (
      <p>
        <strong>Location: </strong>
        {location}
      </p>
    )}
    {description && (
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    )}
  </div>
);

export default ProfileExperience;