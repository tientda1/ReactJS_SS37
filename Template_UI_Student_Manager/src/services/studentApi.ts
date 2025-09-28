import axios from 'axios';
import type { Student } from '../features/students/types';

const API_BASE_URL = 'http://localhost:3001/api'; // Assuming your backend runs on port 3001

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CreateStudentData {
  name: string;
  age: number;
  grade: string;
}

export interface UpdateStudentData {
  name: string;
  age: number;
  grade: string;
}

export const studentApi = {
  // Get all students
  getAllStudents: async (): Promise<Student[]> => {
    try {
      const response = await api.get('/students');
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  // Get student by ID
  getStudentById: async (id: number): Promise<Student> => {
    try {
      const response = await api.get(`/students/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching student ${id}:`, error);
      throw error;
    }
  },

  // Create new student
  createStudent: async (data: CreateStudentData): Promise<Student> => {
    try {
      const response = await api.post('/students', data);
      return response.data;
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  },

  // Update student
  updateStudent: async (id: number, data: UpdateStudentData): Promise<Student> => {
    try {
      const response = await api.put(`/students/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating student ${id}:`, error);
      throw error;
    }
  },

  // Delete student
  deleteStudent: async (id: number): Promise<void> => {
    try {
      await api.delete(`/students/${id}`);
    } catch (error) {
      console.error(`Error deleting student ${id}:`, error);
      throw error;
    }
  },
};
