import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminAddProject.css';

const AdminAddProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Residential',
    location: '',
    year: new Date().getFullYear(),
    area: '',
    description: '',
    featured: false,
    status: 'published'
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 6) {
      alert('Maximum 6 images allowed');
      return;
    }

    setImages(files);

    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const uploadImages = async () => {
    if (images.length === 0) return [];

    setUploading(true);
    const token = localStorage.getItem('admin_token');
    const formDataUpload = new FormData();
    
    images.forEach(image => {
      formDataUpload.append('images', image);
    });

    try {
      console.log('Uploading', images.length, 'images...');
      const response = await fetch('http://localhost:5000/api/upload/multiple', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataUpload
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Upload failed:', errorData);
        throw new Error(errorData.error || 'Image upload failed');
      }

      const data = await response.json();
      console.log('Upload response:', data);
      setUploading(false);
      return data.urls || [];
    } catch (error) {
      console.error('Upload error:', error);
      setUploading(false);
      throw new Error(error.message || 'Image upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload images first
      console.log('Uploading images...');
      const imageUrls = await uploadImages();
      console.log('Images uploaded:', imageUrls);

      // Create project
      const token = localStorage.getItem('admin_token');
      console.log('Creating project with data:', { ...formData, images: imageUrls });
      
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          images: imageUrls
        })
      });

      if (response.ok) {
        alert('Project added successfully!');
        navigate('/admin/dashboard');
      } else {
        const error = await response.json();
        console.error('Server error:', error);
        alert(`Failed to add project: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert(`Failed to add project: ${error.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-add-project">
      <header className="form-header">
        <div className="form-header-content">
          <h1>Add New Project</h1>
          <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
            ← Back to Dashboard
          </button>
        </div>
      </header>

      <main className="form-content">
        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-section">
            <h2>Basic Information</h2>
            
            <div className="form-row">
              <div className="form-group full">
                <label>Project Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Modern Villa in Colombo"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full">
                <label>Slug (URL-friendly) *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  placeholder="auto-generated-from-title"
                />
                <small>Auto-generated from title, but you can customize it</small>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Public">Public</option>
                </select>
              </div>

              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Colombo, Sri Lanka"
                />
              </div>

              <div className="form-group">
                <label>Year *</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  min="1900"
                  max={new Date().getFullYear() + 10}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Area (optional)</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., 2500 sq ft"
                />
                <small>Project area/size (optional)</small>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Description</h2>
            <div className="form-group full">
              <label>Project Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder="Describe the project in detail..."
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Images</h2>
            <div className="form-group full">
              <label>Project Images (Maximum 6) *</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                required
              />
              <small>Upload up to 6 images. First image will be the cover image.</small>
            </div>

            {imagePreviews.length > 0 && (
              <div className="image-previews">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="preview-item">
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    {index === 0 && <span className="cover-badge">Cover</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-section">
            <h2>Settings</h2>
            <div className="form-row">
              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  <span>Feature this project on homepage</span>
                </label>
              </div>

              <div className="form-group">
                <label>Status *</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="cancel-btn"
              disabled={loading || uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={loading || uploading}
            >
              {uploading ? 'Uploading Images...' : loading ? 'Adding Project...' : 'Add Project'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminAddProject;
