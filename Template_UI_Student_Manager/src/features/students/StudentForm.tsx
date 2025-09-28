import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

import type { Student } from './types';

interface Props {
  open: boolean;
  initial?: Partial<Student>;
  onClose: () => void;
  onSubmit: (data: { id?: number; name: string; age: number; grade: string }) => void;
  existingStudents?: Student[];
}

const StudentForm = ({ open, initial, onClose, onSubmit, existingStudents = [] }: Props) => {
  const [name, setName] = useState(initial?.name ?? '');
  const [age, setAge] = useState(initial?.age ?? 16);
  const [grade, setGrade] = useState(initial?.grade ?? '');
  
  // Validation errors
  const [errors, setErrors] = useState({
    name: '',
    age: '',
    grade: ''
  });

  useEffect(() => {
    setName(initial?.name ?? '');
    setAge(initial?.age ?? 16);
    setGrade(initial?.grade ?? '');
    // Clear errors when form opens
    setErrors({ name: '', age: '', grade: '' });
  }, [initial, open]);

  // Validation function
  const validateForm = () => {
    const newErrors = { name: '', age: '', grade: '' };
    let isValid = true;

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Tên sinh viên không được bỏ trống';
      isValid = false;
    } else {
      // Check for duplicate names (excluding current student if editing)
      const isDuplicate = existingStudents.some(student => 
        student.name.toLowerCase() === name.trim().toLowerCase() && 
        student.id !== initial?.id
      );
      if (isDuplicate) {
        newErrors.name = 'Tên sinh viên đã tồn tại';
        isValid = false;
      }
    }

    // Validate age
    if (!age || age <= 0) {
      newErrors.age = 'Tuổi sinh viên không được bỏ trống và phải lớn hơn 0';
      isValid = false;
    }

    // Validate grade
    if (!grade.trim()) {
      newErrors.grade = 'Tên lớp học không được bỏ trống';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    // Submit data
    onSubmit({
      id: initial?.id,
      name: name.trim(),
      age: Number(age),
      grade: grade.trim(),
    });

    // Reset form and focus on name field for new students
    if (!initial?.id) {
      setName('');
      setAge(16);
      setGrade('');
      setErrors({ name: '', age: '', grade: '' });
      // Focus will be handled by autoFocus on name field
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{initial?.id ? 'Edit Student' : 'Add Student'}</DialogTitle>
        <DialogContent className="flex flex-col gap-[15px] space-y-4 !pt-2">
          <TextField
            label="Name"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            fullWidth
            required
            autoFocus
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={(e: any) => setAge(Number(e.target.value))}
            fullWidth
            inputProps={{ min: 1 }}
            error={!!errors.age}
            helperText={errors.age}
          />
          <TextField
            label="Grade"
            value={grade}
            onChange={(e: any) => setGrade(e.target.value)}
            fullWidth
            placeholder="e.g. 10A1"
            error={!!errors.grade}
            helperText={errors.grade}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>CANCEL</Button>
          <Button type="submit" variant="contained" color="primary">
            {initial?.id ? 'SAVE' : 'ADD'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StudentForm;
