import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // Backend na porta 3001

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (userData: any) => api.post('/auth/register', userData),
};

export const patientsAPI = {
  getAll: (hospitalId?: string) => api.get('/patients', { params: { hospitalId } }),
  getById: (id: string) => api.get(`/patients/${id}`),
  create: (patientData: any) => api.post('/patients', patientData),
  update: (id: string, patientData: any) => api.patch(`/patients/${id}`, patientData),
  delete: (id: string) => api.delete(`/patients/${id}`),
};

export const appointmentsAPI = {
  getAll: () => api.get('/appointments'),
  getByDoctor: (doctorId: string) => api.get(`/appointments/doctor/${doctorId}`),
  getByPatient: (patientId: string) => api.get(`/appointments/patient/${patientId}`),
  create: (appointmentData: any) => api.post('/appointments', appointmentData),
  cancel: (id: string, reason?: string) => 
    api.patch(`/appointments/${id}/cancel`, { reason }),
};

export const clinicalAPI = {
  getPatientRecords: (patientId: string) => 
    api.get(`/clinical/patient/${patientId}/records`),
  createMedicalNote: (noteData: any) => 
    api.post('/clinical/medical-notes', noteData),
  createPrescription: (prescriptionData: any) => 
    api.post('/clinical/prescriptions', prescriptionData),
};

export const financeAPI = {
  getReports: (hospitalId?: string, startDate?: string, endDate?: string) =>
    api.get('/finance/reports', { params: { hospitalId, startDate, endDate } }),
  createPayment: (paymentData: any) => api.post('/finance/payments', paymentData),
  processPayment: (id: string, transactionId: string) =>
    api.patch(`/finance/payments/${id}/process`, { transactionId }),
};

export const telemedicineAPI = {
  getSessions: () => api.get('/telemedicine/sessions'),
  getSessionById: (id: string) => api.get(`/telemedicine/sessions/${id}`),
  getSessionsByPatient: (patientId: string) => 
    api.get(`/telemedicine/sessions/patient/${patientId}`),
  getSessionsByDoctor: (doctorId: string) => 
    api.get(`/telemedicine/sessions/doctor/${doctorId}`),
  getUpcomingSessions: () => api.get('/telemedicine/sessions/upcoming'),
  createSession: (sessionData: any) => api.post('/telemedicine/sessions', sessionData),
  endSession: (id: string, recordingUrl?: string) =>
    api.patch(`/telemedicine/sessions/${id}/end`, { recordingUrl }),
};

export const hospitalAPI = {
  getAll: () => api.get('/hospitals'),
  getById: (id: string) => api.get(`/hospitals/${id}`),
  getStats: (id: string) => api.get(`/hospitals/${id}/stats`),
  create: (hospitalData: any) => api.post('/hospitals', hospitalData),
};

export default api;