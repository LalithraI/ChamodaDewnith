import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchProjects();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
      }
    } catch (error) {
      navigate('/admin/login');
    }
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('http://localhost:5000/api/projects', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setProjects(projects.filter(p => p._id !== id));
      }
    } catch (error) {
      alert('Failed to delete project');
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <div className="admin-header-actions">
            <Link to="/admin/add-project" className="add-project-btn">
              + Add New Project
            </Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <main className="admin-content">
        <div className="projects-header">
          <h2>All Projects ({projects.length})</h2>
          <Link to="/" className="view-site-btn" target="_blank">View Live Site</Link>
        </div>

        <div className="projects-grid">
          {projects.map(project => (
            <div key={project._id} className="admin-project-card">
              <div className="project-image">
                {project.images && project.images[0] ? (
                  <img src={project.images[0]} alt={project.title} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p className="project-meta">
                  {project.category} • {project.location} • {project.year}
                </p>
                <p className="project-status">
                  Status: <span className={project.status}>{project.status}</span>
                </p>
              </div>
              <div className="project-actions">
                <Link to={`/admin/edit-project/${project._id}`} className="edit-btn">
                  Edit
                </Link>
                <button onClick={() => handleDelete(project._id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="empty-state">
            <p>No projects yet. Add your first project!</p>
            <Link to="/admin/add-project" className="add-project-btn">
              + Add New Project
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
