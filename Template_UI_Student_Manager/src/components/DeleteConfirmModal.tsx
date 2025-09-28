import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface Props {
  open: boolean;
  studentName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal = ({ open, studentName, onClose, onConfirm }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">
        Xác nhận xóa sinh viên
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Bạn có chắc chắn muốn xóa sinh viên <strong>{studentName}</strong> không?
          <br />
          Hành động này không thể hoàn tác.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmModal;
