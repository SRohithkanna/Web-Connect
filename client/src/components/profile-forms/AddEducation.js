import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school: '', degree: '', fieldofstudy: '', from: '',
    to: '', current: false, description: ''
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const { school, degree, fieldofstudy, from, to, current, description } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="container">
      <h1 className="large text-primary">Add Education</h1>
      <form className="form" onSubmit={(e) => { e.preventDefault(); addEducation(formData, navigate); }}>
        <div className="form-group"><input type="text" placeholder="* School" name="school" value={school} onChange={onChange} required /></div>
        <div className="form-group"><input type="text" placeholder="* Degree" name="degree" value={degree} onChange={onChange} required /></div>
        <div className="form-group"><input type="text" placeholder="* Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={onChange} required /></div>
        <div className="form-group"><h4>From Date</h4><input type="date" name="from" value={from} onChange={onChange} /></div>
        <div className="form-group">
          <p><input type="checkbox" name="current" checked={current} value={current} onChange={() => { setFormData({ ...formData, current: !current }); toggleDisabled(!toDateDisabled); }} /> Current School</p>
        </div>
        <div className="form-group"><h4>To Date</h4><input type="date" name="to" value={to} onChange={onChange} disabled={toDateDisabled} /></div>
        <div className="form-group"><textarea name="description" cols="30" rows="5" placeholder="Description" value={description} onChange={onChange} /></div>
        <input type="submit" className="btn btn-primary my-1" value="Submit" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </section>
  );
};

export default connect(null, { addEducation })(AddEducation);