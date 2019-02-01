import * as React from 'react';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { JsonForms } from '@jsonforms/react';

const styles: StyleRulesCallback<'appBar' | 'flex'> = theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: theme.palette.background.default
  },
  flex: {
    flex: 1,
  },
});

const Transition = props => {
  return <Slide direction='up' {...props} />;
};

interface PreviewProps {
  onClose: any;
  open: boolean;
  schema: any;
  uischema: any;
  path: string;
}

class PreviewDialog extends
  React.Component<PreviewProps & WithStyles<'appBar' | 'flex'>, {}> {

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { classes, open, path, schema, uischema } = this.props;

    return (
      <div>
        <Dialog
          disableEnforceFocus={true}
          fullScreen
          open={open}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color='inherit' onClick={this.handleClose} aria-label='Close'>
                <CloseIcon />
              </IconButton>
              <Typography variant='title' color='inherit' className={classes.flex}>
                Preview
              </Typography>
            </Toolbar>
          </AppBar>
          <JsonForms
            schema={schema}
            path={path}
            uischema={uischema}
          />
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PreviewDialog);
