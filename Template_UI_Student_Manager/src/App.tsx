import React, { useMemo, useState, useEffect } from 'react';

import { Button, CircularProgress, Alert, Box, Typography, Backdrop } from '@mui/material';
import type { Student } from './features/students/types';
import StudentForm from './features/students/StudentForm';
import StudentList from './features/students/StudentList';
import StudentSearchSortFilter from './features/students/StudentSearchSortFilter';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { studentApi } from './services/studentApi';

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [operationLoading, setOperationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Student> | undefined>(undefined);
  
  // Delete confirmation modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  // Search / filter / sort state
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'age'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Load students on component mount
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await studentApi.getAllStudents();
      setStudents(data);
    } catch (err) {
      setError('Không thể tải danh sách sinh viên. Vui lòng thử lại.');
      console.error('Error loading students:', err);
    } finally {
      setLoading(false);
    }
  };

  const grades = useMemo(() => {
    const g = Array.from(new Set(students.map((s) => s.grade))).sort();
    return g;
  }, [students]);

  const handleAddClick = () => {
    setEditing(undefined);
    setOpenForm(true);
  };

  const handleSubmit = async (data: {
    id?: number;
    name: string;
    age: number;
    grade: string;
  }) => {
    try {
      setError(null);
      setOperationLoading(true);
      if (data.id) {
        // update
        await studentApi.updateStudent(data.id, {
          name: data.name,
          age: data.age,
          grade: data.grade,
        });
      } else {
        // create
        await studentApi.createStudent({
          name: data.name,
          age: data.age,
          grade: data.grade,
        });
      }
      setOpenForm(false);
      // Reload students after successful operation
      await loadStudents();
    } catch (err) {
      setError(data.id ? 'Không thể cập nhật sinh viên.' : 'Không thể thêm sinh viên mới.');
      console.error('Error submitting student:', err);
    } finally {
      setOperationLoading(false);
    }
  };

  const handleEdit = (s: Student) => {
    setEditing(s);
    setOpenForm(true);
  };

  const handleDeleteClick = (student: Student) => {
    setStudentToDelete(student);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!studentToDelete) return;
    
    try {
      setError(null);
      setOperationLoading(true);
      await studentApi.deleteStudent(studentToDelete.id);
      // Reload students after successful deletion
      await loadStudents();
      // Close modal
      setDeleteModalOpen(false);
      setStudentToDelete(null);
    } catch (err) {
      setError('Không thể xóa sinh viên.');
      console.error('Error deleting student:', err);
    } finally {
      setOperationLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setStudentToDelete(null);
  };

  const handleClearFilters = () => {
    setSearch('');
    setGradeFilter('all');
    setSortBy('name');
    setSortDir('asc');
  };

  // Selector logic: apply search, filter, sort
  const filteredSorted = useMemo(() => {
    let out = students.slice();

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      out = out.filter((s) => s.name.toLowerCase().includes(q));
    }

    if (gradeFilter !== 'all') {
      out = out.filter((s) => s.grade === gradeFilter);
    }

    out.sort((a, b) => {
      if (sortBy === 'name') {
        const r = a.name.localeCompare(b.name);
        return sortDir === 'asc' ? r : -r;
      } else {
        const r = a.age - b.age;
        return sortDir === 'asc' ? r : -r;
      }
    });

    return out;
  }, [students, search, gradeFilter, sortBy, sortDir]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" color="text.secondary">
            Đang tải danh sách sinh viên...
          </Typography>
        </Box>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🎓 Student Manager</h1>

      {error && (
        <Alert severity="error" className="mb-4" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <div className="flex gap-4 mb-4">
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          ADD STUDENT
        </Button>
      </div>

      <StudentSearchSortFilter
        search={search}
        gradeFilter={gradeFilter}
        sortBy={sortBy}
        sortDir={sortDir}
        grades={grades}
        onSearchChange={setSearch}
        onGradeChange={setGradeFilter}
        onSortChange={(by, dir) => {
          setSortBy(by);
          setSortDir(dir);
        }}
        onClear={handleClearFilters}
      />

      <div className="mt-6">
        <StudentList
          students={filteredSorted}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </div>

      <StudentForm
        open={openForm}
        initial={editing}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        existingStudents={students}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteModalOpen}
        studentName={studentToDelete?.name || ''}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />

      {/* Operation Loading Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={operationLoading}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <CircularProgress color="inherit" size={60} thickness={4} />
          <Typography variant="h6">
            Đang xử lý...
          </Typography>
        </Box>
      </Backdrop>
    </div>
  );
};

export default App;
