import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import type { Student } from './types';

interface Props {
  student: Student;
  onEdit: (s: Student) => void;
  onDelete: (id: number) => void;
}

const StudentItem = ({ student, onEdit, onDelete }: Props) => {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="flex items-center justify-between">
        <div>
          <Typography variant="h6" className="font-medium">
            {student.name}
          </Typography>
          <Typography variant="body2" className="text-sm text-gray-500">
            Tuổi: {student.age} • Lớp: {student.grade}
          </Typography>
        </div>

        <div className="flex items-center gap-2">
          <IconButton size="small" onClick={() => onEdit(student)} aria-label="edit">
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDelete(student.id)}
            aria-label="delete"
          >
            <Delete fontSize="small" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentItem;
