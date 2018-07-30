import * as React from 'react';
import { connect } from 'react-redux';
import EditorBar from './editor/app-bar/EditorBar';
import JsonEditorIde from './editor/JsonEditorIde';
import { getData, getSchema, getUiSchema } from '@jsonforms/core';
import { calculateLabel, filterPredicate, imageGetter } from './index';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#ee6e73',
      dark: '#26a69a'
    },
    background: {
      'default': '#3748AC'
    }
  },
  typography: {
    fontSize: 12
  },
});

interface AppProps {
  uischema: any;
  schema: any;
  rootData: any;
  filterPredicate: any;
  labelProvider: any;
  imageProvider: any;
}

class App extends React.Component<AppProps, {}> {

  render() {
    const { rootData, uischema, schema } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div>
            <EditorBar schema={schema} rootData={rootData}/>
            <JsonEditorIde
              uischema={uischema}
              schema={schema}
              filterPredicate={filterPredicate}
              labelProvider={calculateLabel}
              imageProvider={imageGetter}
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    uischema: getUiSchema(state),
    schema: getSchema(state),
    rootData: getData(state)
  };
};

export default connect(mapStateToProps)(App);
