import * as React from 'react';
import { connect } from 'react-redux';
import EditorBar from './editor/app-bar/EditorBar';
import JsonEditorIde from './editor/JsonEditorIde';
import { getData, getSchema, getUiSchema } from '@jsonforms/core';
import {
  EditorContext,
  getIdentifyingProperty,
  getModelMapping,
  SchemaService,
  SchemaServiceImpl
} from '@jsonforms/editor';

interface AppProps {
  uischema: any;
  schema: any;
  schemaService: SchemaService;
  rootData: any;
}

class App extends React.Component<AppProps, {}> {

  render() {
    const { rootData, uischema, schema, schemaService } = this.props;

    return (
      <div>
        <EditorBar schema={schema} rootData={rootData}/>
        <JsonEditorIde uischema={uischema} schema={schema} schemaService={schemaService}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const editorContext: EditorContext = {
    dataSchema: getSchema(state),
    modelMapping: getModelMapping(state),
    identifyingProperty: getIdentifyingProperty(state)
  };
  const schemaService = new SchemaServiceImpl(editorContext);

  return {
    uischema: getUiSchema(state),
    schema: getSchema(state),
    schemaService: schemaService,
    rootData: getData(state)
  };
};

export default connect(mapStateToProps)(App);
