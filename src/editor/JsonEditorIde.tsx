import * as React from 'react';
import { connect } from 'react-redux';
import { TreeRenderer } from '@jsonforms/editor';
import './jsoneditor.css';
import './example.css';

const JsonFormsEditorIde = props => {
  const { uischema, schema, filterPredicate} = props;

  return (
    <div>
      <TreeRenderer uischema={uischema} schema={schema} filterPredicate={filterPredicate}/>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    uischema: ownProps.uischema,
    schema: ownProps.schema,
    filterPredicate: ownProps.filterPredicate
  };
};

export default connect(mapStateToProps)(JsonFormsEditorIde);
