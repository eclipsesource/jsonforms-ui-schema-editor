import * as React from 'react';
import { connect } from 'react-redux';
import {
  and,
  EnumFieldProps,
  mapStateToFieldProps,
  RankedTester,
  rankWith,
  schemaSubPathMatches,
  StatePropsOfEnumField,
  uiTypeIs
} from '@jsonforms/core';
import * as _ from 'lodash';
import { MaterialEnumField } from '@jsonforms/material-renderers';
import {
  JsonForms
} from '@jsonforms/react';

export const hasUnionType = and(
  uiTypeIs('Control'),
  schemaSubPathMatches(
    'type',
    schema => _.isArray(schema) && !_.isEmpty(schema)
  )
);

export const ExpectedValueFieldTester: RankedTester = rankWith(2, hasUnionType);

export const mapStateToEnumFieldProps = (state, ownProps): StatePropsOfEnumField => {
  const props = mapStateToFieldProps(state, ownProps);
  const options: any = props.scopedSchema.type;

  return {
    ...props,
    options
  };
};

interface EnumFieldState {
  selectedType: string;
}

export class ExpectedValueField extends
  React.Component <EnumFieldProps, EnumFieldState> {

  constructor(props) {
    super(props);
    this.state = {
      selectedType: ''
    };
  }

  selectionHandle = (path, value) => {
    this.setState({
      selectedType: value
    });
  }

  render() {
    const localSchema = {
      type: 'string'
    };
    const localUISchema = {
      type: 'Control',
      label: 'Rule Constant',
      scope: '#'
    };
    if (this.state.selectedType !== '') {
      localSchema.type = this.state.selectedType;
    }
    return (
      <React.Fragment>
        <MaterialEnumField
          {...this.props}
          data={this.state.selectedType !== '' ? this.state.selectedType : ''}
          handleChange={this.selectionHandle}
        />
        {
          this.state.selectedType !== '' ?
            <JsonForms
              schema={localSchema}
              path={this.props.path}
              uischema={localUISchema}
            />
            : ''
        }
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToEnumFieldProps
)(ExpectedValueField);
