import * as React from 'react';
import { connect } from 'react-redux';
import { TreeRenderer } from '@jsonforms/editor';
import './jsoneditor.css';
import './example.css';

const JsonFormsEditorIde = props => {
  const { uischema, schema, schemaService} = props;

  return (
    <div>
      <TreeRenderer uischema={uischema} schema={schema} schemaService={schemaService}/>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    uischema: ownProps.uischema,
    schema: ownProps.schema,
    schemaService: ownProps.schemaService
  };
};

export default connect(mapStateToProps)(JsonFormsEditorIde);
