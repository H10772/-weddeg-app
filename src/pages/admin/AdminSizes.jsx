import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './AdminProducts.css';

/**
 * AdminSizes Component
 * Manage sizes - CRUD operations
 */
const AdminSizes = () => {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSize, setEditingSize] = useState(null);
  const [formData, setFormData] = useState({
    name: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSizes();
  }, []);

  const fetchSizes = async () => {
    try {
      const { data, error } = await supabase
        .from('sizes')
        .select('*')
        .order('name');

      if (error) throw error;
      setSizes(data || []);
    } catch (error) {
      setError('Failed to fetch sizes: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (size = null) => {
    if (size) {
      setEditingSize(size);
      setFormData({
        name: size.name
      });
    } else {
      setEditingSize(null);
      setFormData({
        name: ''
      });
    }
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSize(null);
    setFormData({
      name: ''
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const sizeData = {
        name: formData.name
      };

      if (editingSize) {
        // Update
        const { error } = await supabase
          .from('sizes')
          .update(sizeData)
          .eq('id', editingSize.id);

        if (error) throw error;
        setSuccess('Size updated successfully!');
      } else {
        // Insert
        const { error } = await supabase
          .from('sizes')
          .insert([sizeData]);

        if (error) throw error;
        setSuccess('Size created successfully!');
      }

      fetchSizes();
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      setError('Failed to save size: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this size?')) return;

    try {
      const { error } = await supabase
        .from('sizes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSuccess('Size deleted successfully!');
      fetchSizes();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to delete size: ' + error.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <div className="loading-state">Loading sizes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Sizes Management</h1>
            <p className="page-subtitle">Manage available product sizes</p>
          </div>
          <div className="header-actions">
            <button className="btn-primary" onClick={() => handleOpenModal()}>
              <i className="bi bi-plus-circle"></i> Add Size
            </button>
            <Link to="/admin" className="btn-secondary">
              <i className="bi bi-arrow-left"></i> Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Messages */}
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* Sizes Grid */}
        <div className="table-container">
          {sizes.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-rulers"></i>
              <p>No sizes yet</p>
              <button className="btn-primary" onClick={() => handleOpenModal()}>
                Add Your First Size
              </button>
            </div>
          ) : (
            <div className="sizes-grid">
              {sizes.map((size) => (
                <div key={size.id} className="size-card">
                  <div className="size-name">{size.name}</div>
                  <div className="size-actions">
                    <button 
                      className="btn-icon btn-edit" 
                      onClick={() => handleOpenModal(size)}
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button 
                      className="btn-icon btn-delete" 
                      onClick={() => handleDelete(size.id)}
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingSize ? 'Edit Size' : 'Add New Size'}</h2>
                <button className="modal-close" onClick={handleCloseModal}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label htmlFor="name">Size Name *</label>
                  <input
                    type="text"
                    id="name"
                    className="form-input"
                    placeholder="e.g., S, M, L, XL"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingSize ? 'Update Size' : 'Create Size'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminSizes;
