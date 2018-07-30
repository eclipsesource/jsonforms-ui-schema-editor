import * as React from 'react';
import { connect } from 'react-redux';
import { TreeWithDetailRenderer } from '@jsonforms/material-tree-renderer';
import './example.css';

const JsonFormsEditorIde = props => {
  const { imageProvider, labelProvider, uischema, schema, filterPredicate} = props;

  return (
    <div>
      <TreeWithDetailRenderer
        uischema={uischema}
        schema={schema}
        filterPredicate={filterPredicate}
        labelProvider={labelProvider}
        imageProvider={imageProvider}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    uischema: ownProps.uischema,
    schema: ownProps.schema,
    filterPredicate: ownProps.filterPredicate,
    imageProvider: ownProps.imageProvider,
    labelProvider: ownProps.labelProvider
  };
};

export default connect(mapStateToProps)(JsonFormsEditorIde);
