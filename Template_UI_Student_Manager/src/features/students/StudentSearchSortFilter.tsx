import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import React from 'react';

interface Props {
  search: string;
  gradeFilter: string; // 'all' or specific grade
  sortBy: 'name' | 'age';
  sortDir: 'asc' | 'desc';
  grades: string[]; // available grade options
  onSearchChange: (s: string) => void;
  onGradeChange: (g: string) => void;
  onSortChange: (by: 'name' | 'age', dir: 'asc' | 'desc') => void;
  onClear: () => void;
}

const StudentSearchSortFilter: React.FC<Props> = ({
  search,
  gradeFilter,
  sortBy,
  sortDir,
  grades,
  onSearchChange,
  onGradeChange,
  onSortChange,
  onClear,
}) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 items-center">
      <TextField
        label="Tìm theo tên"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1"
        size="small"
      />

      <FormControl size="small" className="w-40">
        <InputLabel>Lớp</InputLabel>
        <Select
          value={gradeFilter}
          label="Lớp"
          onChange={(e) => onGradeChange(e.target.value)}
        >
          <MenuItem value="all">Tất cả</MenuItem>
          {grades.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" className="w-36">
        <InputLabel>Sắp xếp</InputLabel>
        <Select
          value={`${sortBy}_${sortDir}`}
          label="Sắp xếp"
          onChange={(e) => {
            const [by, dir] = (e.target.value as string).split('_');
            onSortChange(by as 'name' | 'age', dir as 'asc' | 'desc');
          }}
        >
          <MenuItem value="name_asc">Tên A → Z</MenuItem>
          <MenuItem value="name_desc">Tên Z → A</MenuItem>
          <MenuItem value="age_asc">Tuổi ↑</MenuItem>
          <MenuItem value="age_desc">Tuổi ↓</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={onClear} variant="outlined" className="ml-auto">
        CLEAR
      </Button>
    </div>
  );
};

export default StudentSearchSortFilter;
