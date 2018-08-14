import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { getData, getUiSchema } from '@jsonforms/core';
import PreviewDialog from './PreviewDialog';
import { setModelSchema } from '../../../reducers';

const styles: StyleRulesCallback<'textarea'> = () => ({
  textarea: {
    width: 400,
    whiteSpace: 'pre-wrap',
    overflowWrap: 'normal',
    overflowX: 'scroll'
  }
});

interface ModelSchemaDialogProps {
  onClose: any;
  readOnly: boolean;
  open: boolean;
  setModelSchema?: any;
  fullScreen?: boolean;
  rootData?: any;
}

interface ModelSchemaDialogState {
  modelSchema: any;
  inputValue: string;
  preview: {
    open: boolean
  };
}

class ModelSchemaDialog extends
  React.Component<ModelSchemaDialogProps & WithStyles<'textarea'>, ModelSchemaDialogState> {
  private textInput;
  componentWillMount() {
    this.textInput = {};

    this.setState({
      modelSchema: {},
      inputValue: '{}',
      preview: {
        open: false
      }
    });
  }

  handleChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  }

  handleCancel = () => {
    this.props.onClose();
  }

  handleOk = () => {
    this.props.setModelSchema(this.state.modelSchema);
    this.props.onClose();
  }

  handlePreviewOpen = () => {
    try {
      const modelSchema = JSON.parse(this.textInput.value);
      this.setState({
        preview: {
          open: true
        },
        modelSchema: modelSchema
      });
    } catch (err) {
      console.error('The entered text did not contain valid JSON.', err);
      alert(`The entered text does not contain valid JSON`);

      return;
    }
  }

  handlePreviewClose = () => {
    this.setState({
      preview: {
        open: false
      }
    });
  }

  handleCopy = () => {
    this.textInput.select();
    document.execCommand('copy');
  }

  render() {
    const { classes, fullScreen, open, rootData, readOnly } = this.props;
    const textFieldData = readOnly ?
      JSON.stringify(rootData, null, 2) :
      this.state.inputValue;
    const disabled = this.state.inputValue === '{}' || this.state.inputValue === '';

    return (
      <Dialog open={open} fullScreen={fullScreen}>
        <DialogTitle id='model-schema-dialog'>
          {readOnly ? 'Export UI Schema' : 'Enter Model Schema'}
        </DialogTitle>
        <DialogContent>
          <TextField
            id='model-schema-textfield'
            className={classes.textarea}
            label={readOnly ? 'UI Schema' : 'Model Schema'}
            multiline
            value={textFieldData}
            onChange={this.handleChange}
            margin='normal'
            rowsMax={25}
            inputProps={{
              readOnly: readOnly
            }}
            inputRef={input => this.textInput = input}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color='primary'>
            Cancel
          </Button>
          {
            readOnly ?
              <Button onClick={this.handleCopy} color='primary'>
                Copy
              </Button> :
              <div>
                <Button onClick={this.handleOk} color='primary'>
                  Ok
                </Button>
                <Button
                  disabled={disabled}
                  onClick={this.handlePreviewOpen}
                  color='primary'
                >
                  Preview
                </Button>
              </div>
          }
          <PreviewDialog
            open={this.state.preview.open}
            onClose={this.handlePreviewClose}
            schema={this.state.modelSchema}
            path=''
            uischema={rootData}
          />
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const rootData = getData(state);

  return {
    rootData,
    classes: ownProps.classes,
    onClose: ownProps.onClose,
    readOnly: ownProps.readOnly,
    open: ownProps.open,
    uischema: getUiSchema(state)
  };
};

const mapDispatchToProps = dispatch => ({
  setModelSchema(value) {
    dispatch(setModelSchema(value));
  }
});

export default compose(
  withStyles(styles, { name: 'ModelSchemaDialog' }),
  withMobileDialog(),
  connect(mapStateToProps, mapDispatchToProps)
)(ModelSchemaDialog);
