import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Styling.css'; // Ensure styles are implemented here

interface FormData {
  firstName: string;
  gender: string;
  age: number;
  city: string;
  country: string;
  goodness: string;
  wish1: string;
  wish2: string;
  wish3: string;
  comments: string;
  email: string;
}

const initialFormData: FormData = {
  firstName: '',
  gender: '',
  age: 0,
  city: '',
  country: '',
  goodness: '',
  wish1: '',
  wish2: '',
  wish3: '',
  comments: '',
  email: '',
};

const WriteLetter: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [emailSent, setEmailSent] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const santaMessage = `
      Ho ho ho, ${formData.firstName}!
      Santa here! I see you're a wonderful ${formData.gender} from ${formData.city}, ${formData.country}.
      At just ${formData.age} years old, you've been so good this year because "${formData.goodness}".
      I’ll keep in mind your wishes:
        1. ${formData.wish1}
        2. ${formData.wish2}
        3. ${formData.wish3}
      And I'll make sure to read your comments: "${formData.comments}".
      Have a Merry Christmas!
    `;

    try {
      await axios.post('http://localhost:5000/send-email', {
        email: formData.email,
        subject: 'A Message from Santa 🎅',
        message: santaMessage,
      });

      setEmailSent(true);
      alert('Email sent successfully!');
    } catch (error) {
      setEmailSent(false);
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    }
  };

  return (
    <div className="santa-letter-container-1">
      <h1 className="santa-title">Write Your Letter to Santa</h1>
      <p className="note">* Please make sure to get approval from your parents before submitting your letter to Santa.</p>
      <form onSubmit={handleSubmit}>
        {Object.keys(initialFormData).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
              {key !== 'comments' && ' *'}
            </label>
            {key === 'comments' ? (
              <textarea
                id={key}
                name={key}
                placeholder={`Enter your ${key}`}
                value={formData[key as keyof FormData]}
                onChange={handleChange}
                className="festive-input"
              />
            ) : (
              <input
                type={key === 'email' ? 'email' : key === 'age' ? 'number' : 'text'}
                id={key}
                name={key}
                placeholder={`Enter your ${key}`}
                value={formData[key as keyof FormData]}
                onChange={handleChange}
                className="festive-input"
                required={key !== 'comments'}
              />
            )}
          </div>
        ))}
        <p className='note'>
          Now just click a button below to send your letter!
        </p>
        <button type="submit">Submit</button>
      </form>

      {emailSent !== null && (
        <div className="email-status">
          {emailSent ? (
            <p>🎅✨ Hooray! Santa’s magical message is on its way to your inbox. Keep an eye out for some holiday cheer! 🎄❄️</p>
          ) : (
            <p>There was an error sending your email. Please try again later.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WriteLetter;
