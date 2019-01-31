import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as _ from 'lodash';
import {
  StyleRulesCallback,
  withStyles,
  WithStyles,
  withTheme
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FolderOpen from '@material-ui/icons/FolderOpen';
import ImportExport from '@material-ui/icons/ImportExport';
import ModelSchemaDialog from './dialogs/ModelSchemaDialog';
import { Actions } from '@jsonforms/core';
import { validate } from '../../validation';

const styles:
  StyleRulesCallback<'root' | 'flex' | 'rightIcon' | 'button' | 'appBar'> = theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: theme.palette.background.default
  },
  flex: {
    flex: 1
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

interface EditorBarProps {
  schema: any;
  rootData: any;
  updateRootData?: any;
}

interface EditorBarState {
  modelSchema: {
    open: boolean
  };
  exportDialog: {
    open: boolean
  };
}

class EditorBar extends
  React.Component<EditorBarProps & WithStyles<'root' | 'flex' | 'rightIcon' | 'button' | 'appBar'>,
                  EditorBarState> {
  componentWillMount() {
    this.setState({
      modelSchema: {
        open: false
      },
      exportDialog: {
        open: false
      }
    });
  }

  handleModelSchemaOpen = () => {
    this.setState({
      modelSchema: {
        open: true
      }
    });
  };

  handleModelSchemaClose = () => {
    this.setState({
      modelSchema: {
        open: false
      }
    });
  };

  handleExportDialogOpen = () => {
    this.setState({
      exportDialog: {
        open: true
      }
    });
  };

  handleExportDialogClose = () => {
    this.setState({
      exportDialog: {
        open: false
      }
    });
  };

  handleDownload = () => {
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(this.props.rootData, null, 2)],
                          {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = 'download.json';
    a.click();
  };

  handleFileUpload = event => {
    // triggered after a file was selected
    const schema = this.props.schema;
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (_.isEmpty(files) || files.length > 1) {
      return;
    }
    const file = files[0];
    const reader = new FileReader();

    // Callback when the file was loaded
    reader.onload = () => {
      if (reader.result === undefined || reader.result === null) {
        console.error('Could not read data');
      }
      let readData;
      try {
        readData = JSON.parse(reader.result as string);
      } catch (err) {
        console.error('The loaded file did not contain valid JSON.', err);
        alert(`The selected file '${file.name}' does not contain valid JSON`);

        return;
      }
      if (!_.isEmpty(readData)) {
        const validator = validate(schema);
        const errors = validator(readData);
        this.props.updateRootData(readData);
        if (errors) {
          alert('Loaded data does not adhere to the specified schema.');
          console.error('Loaded data does not adhere to the specified schema.');
        }
      }
    };

    reader.readAsText(file);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position='static'>
          <Toolbar>
            <Typography variant='title' color='inherit' className={classes.flex}>
              UI Schema Editor
            </Typography>
            <Button className={classes.button} color='inherit' onClick={this.handleModelSchemaOpen}>
              Upload Schema Model/Domain
            </Button>
            <ModelSchemaDialog
              open={this.state.modelSchema.open}
              readOnly={false}
              onClose={this.handleModelSchemaClose}
            />
            <Button component='label' className={classes.button} color='inherit'>
              Open UI Schema File
              <FolderOpen className={classes.rightIcon} />
              <input
                onChange={this.handleFileUpload}
                style={{ display: 'none' }}
                type='file'
              />
            </Button>
            <Button
              className={classes.button}
              color='inherit'
              onClick={this.handleExportDialogOpen}
            >
              Export UI Schema
              <ImportExport className={classes.rightIcon} />
            </Button>
            <ModelSchemaDialog
              open={this.state.exportDialog.open}
              readOnly={true}
              onClose={this.handleExportDialogClose}
            />
            <Button className={classes.button} color='inherit' onClick={this.handleDownload}>
              Download UI Schema
            </Button>

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    schema: ownProps.schema,
    rootData: ownProps.rootData
  };
};

const mapDispatchToProps = dispatch => ({
  updateRootData(data: Object) {
    dispatch(Actions.update('', () => data));
  }
});

export default compose(
  withTheme(),
  withStyles(styles, { name: 'EditorBar' }),
  connect(mapStateToProps, mapDispatchToProps)
)(EditorBar);
