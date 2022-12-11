import {
  Alert,
  Button,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { FullUser } from 'common';
import { useState } from 'react';

type MergeModalProps = {
  users: FullUser[];
  open: boolean;
  onClose: () => void;
  onMerge: (into: FullUser, merged: FullUser[]) => void;
};

export default function MergeModal({
  users,
  open,
  onClose,
  onMerge,
}: MergeModalProps) {
  const [main, setMain] = useState<FullUser | null>(null);

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Merge Users</DialogTitle>
      <Alert severity="warning">
        You are about to merge users. This cannot be undone. Be very careful.
      </Alert>

      <DialogContent>
        <div>
          <List
            subheader={
              <ListSubheader>Choose the user to merge into:</ListSubheader>
            }
          >
            {users.map((u) => (
              <ListItem
                disablePadding
                selected={main === u}
                key={u.id}
                onClick={() => setMain(u)}
              >
                <ListItemButton>
                  <ListItemText
                    primary={`${u.name}${u.email ? ` (${u.email})` : ''}`}
                    secondary={u.accountType}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </DialogContent>
      {main ? (
        <Alert severity="info">
          You are going to merge all users in this list into{' '}
          <b>
            {main.name} ({main.email})
          </b>
          .<br />
          This means <b>all users in this list will be deleted</b>,{' '}
          <b>except</b> {main.email}, and all their dashboards, posts, votes
          etc. transferred to {main.email}.
        </Alert>
      ) : null}
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          style={{ backgroundColor: colors.red[500], color: 'white' }}
          onClick={onClose}
          disabled={false}
        >
          Merge{main ? ` ${users.length - 1} users into ${main.name}` : ''}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
