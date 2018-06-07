import * as React from 'react';
import { connect } from 'react-redux';
import EditorBar from './editor/app-bar/EditorBar';
import JsonEditorIde from './editor/JsonEditorIde';
import { getData, getSchema, getUiSchema } from '@jsonforms/core';
import { filterPredicate } from './index';

interface AppProps {
  uischema: any;
  schema: any;
  rootData: any;
  filterPredicate: any;
}

class App extends React.Component<AppProps, {}> {

  render() {
    const { rootData, uischema, schema } = this.props;

    return (
      <div>
        <EditorBar schema={schema} rootData={rootData}/>
        <JsonEditorIde uischema={uischema} schema={schema} filterPredicate={filterPredicate}/>
      </div>
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
