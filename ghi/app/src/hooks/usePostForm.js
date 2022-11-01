import { useState } from 'react';

const usePostForm = (initialFormData, url) => {
  const [data, setData] = useState(initialFormData);

  const handleData = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitPostForm = async (e) => {
    e.preventDefault();
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const resetForm = { ...data };
      Object.keys(resetForm).forEach(key => resetForm[key] = "");
      setData(resetForm);
    }
  };

  return [data, handleData, submitPostForm];
};

export default usePostForm;
