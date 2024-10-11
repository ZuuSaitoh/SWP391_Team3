import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ServiceViewDashboard = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedService, setEditedService] = useState(null);
  const { serviceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/services/${serviceId}`);
        if (response.data) {
          setService(response.data);
          setEditedService(response.data);
        } else {
          setError('Failed to fetch service details');
        }
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('An error occurred while fetching service details');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const response = await axios.delete(`http://localhost:8080/services/delete/${serviceId}`);
        if (response.data.code === 1012) {
          toast.success('Service deleted successfully');
          navigate('/dashboard');
        } else {
          toast.error('Failed to delete service');
        }
      } catch (err) {
        console.error('Error deleting service:', err);
        toast.error('An error occurred while deleting the service');
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedService(service);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedService({ ...editedService, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/services/update/${serviceId}`, {
        service_name: editedService.serviceName,
        price: parseFloat(editedService.price),
        description: editedService.description,
        service_type: editedService.serviceType
      });
      if (response.data.code === 8888) {
        toast.success('Service updated successfully');
        setService(response.data.result);
        setIsEditing(false);
      } else {
        toast.error('Failed to update service');
      }
    } catch (err) {
      console.error('Error updating service:', err);
      toast.error('An error occurred while updating the service');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!service) return <div>No service found</div>;

  return (
    <div className="service-view-dashboard">
      <h1>Service Details</h1>
      {isEditing ? (
        <form onSubmit={handleUpdate} className="edit-service-form">
          <div>
            <label>Service Name:</label>
            <input
              type="text"
              name="serviceName"
              value={editedService.serviceName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={editedService.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={editedService.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Service Type:</label>
            <select
              name="serviceType"
              value={editedService.serviceType}
              onChange={handleInputChange}
              required
            >
              <option value="Cleaning Pond Service">Cleaning Pond Service</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="update-btn">Update Service</button>
            <button type="button" onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="service-details">
          <p><strong>Service ID:</strong> {service.serviceId}</p>
          <p><strong>Service Name:</strong> {service.serviceName}</p>
          <p><strong>Price:</strong> ${service.price.toFixed(2)}</p>
          <p><strong>Description:</strong> {service.description}</p>
          <p><strong>Service Type:</strong> {service.serviceType}</p>
        </div>
      )}
      <div className="service-actions">
        <button onClick={() => navigate('/dashboard')} className="back-to-dashboard-btn">
          Back to Dashboard
        </button>
        {!isEditing && (
          <>
            <button onClick={handleEdit} className="edit-service-btn">
              Edit Service
            </button>
            <button onClick={handleDelete} className="delete-service-btn">
              Delete Service
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceViewDashboard;