import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../config';
import './AdminAddProject.css';

const AdminAddProject = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL for edit mode
  const isEditMode = !!id;
  
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
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (isEditMode) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/api/projects/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setFormData({
          title: data.title,
          slug: data.slug || '',
          category: data.category,
          location: data.location,
          year: data.year,
          area: data.area || '',
          description: data.description,
          featured: data.featured || false,
          status: data.status || 'published'
        });
        setExistingImages(data.images || []);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

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
      alert('⚠️ Maximum 6 images allowed per project. Please select up to 6 images.');
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
      const response = await fetch(`${API_URL}/api/upload/multiple`, {
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
      // Upload new images if any
      console.log('Uploading images...');
      const newImageUrls = await uploadImages();
      console.log('New images uploaded:', newImageUrls);

      // Combine existing images with new ones
      const allImages = isEditMode ? [...existingImages, ...newImageUrls] : newImageUrls;

      const token = localStorage.getItem('admin_token');
      const url = isEditMode 
        ? `${API_URL}/api/projects/${id}`
        : `${API_URL}/api/projects`;
      const method = isEditMode ? 'PUT' : 'POST';

      console.log(`${isEditMode ? 'Updating' : 'Creating'} project with data:`, { ...formData, images: allImages });
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          images: allImages
        })
      });

      if (response.ok) {
        const successMessage = isEditMode 
          ? '✅ Project updated successfully! Your changes are now live.' 
          : '🎉 Project added successfully! Your new project is now visible on the website.';
        alert(successMessage);
        navigate('/admin/dashboard');
      } else {
        const error = await response.json();
        console.error('Server error:', error);
        const errorMessage = isEditMode 
          ? `❌ Failed to update project: ${error.error || 'Please check your inputs and try again.'}` 
          : `❌ Failed to add project: ${error.error || 'Please check your inputs and try again.'}`;
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      const catchMessage = isEditMode 
        ? `⚠️ Unable to update project. ${error.message || 'Please check your connection and try again.'}` 
        : `⚠️ Unable to add project. ${error.message || 'Please check your connection and try again.'}`;
      alert(catchMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-add-project">
      <header className="form-header">
        <div className="form-header-content">
          <h1>{isEditMode ? 'Edit Project' : 'Add New Project'}</h1>
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
            
            {isEditMode && existingImages.length > 0 && (
              <div className="form-group full">
                <label>Existing Images</label>
                <div className="image-previews">
                  {existingImages.map((img, index) => (
                    <div key={`existing-${index}`} className="preview-item">
                      <img src={img} alt={`Existing ${index + 1}`} />
                      {index === 0 && <span className="cover-badge">Cover</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="form-group full">
              <label>{isEditMode ? 'Add More Images (Optional)' : 'Project Images (Maximum 6) *'}</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                required={!isEditMode}
              />
              <small>{isEditMode ? 'Add up to 6 more images.' : 'Upload up to 6 images. First image will be the cover image.'}</small>
            </div>

            {imagePreviews.length > 0 && (
              <div className="form-group full">
                <label>New Images to Upload</label>
                <div className="image-previews">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="preview-item">
                      <img src={preview} alt={`Preview ${index + 1}`} />
                    </div>
                  ))}
                </div>
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
              {uploading 
                ? 'Uploading Images...' 
                : loading 
                  ? `${isEditMode ? 'Updating' : 'Adding'} Project...` 
                  : `${isEditMode ? 'Update' : 'Add'} Project`
              }
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminAddProject;
