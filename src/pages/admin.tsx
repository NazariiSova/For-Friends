'use client'
import React, { useState } from 'react';
import { useStore } from '../utils/store';

const AdminForm = () => {
  const { addCard } = useStore();
  const [formData, setFormData] = useState({ title: '', imageUrl: '', date: '', excerpt: '', content: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addCard(formData);
    setFormData({ title: '', imageUrl: '', date: '', excerpt: '', content: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
      <input type="text" placeholder="Image URL" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} />
      <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
      <textarea placeholder="Excerpt" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} />
      <textarea placeholder="Content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
      <button type="submit">Add Card</button>
    </form>
  );
};

export default AdminForm;
