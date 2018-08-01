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
  uiTypeIs,
  update
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

interface ExpectedValueFieldProps extends EnumFieldProps {
  updateRootData: any;
}

export class ExpectedValueField extends
  React.Component <ExpectedValueFieldProps, EnumFieldState> {

  constructor(props) {
    super(props);
    this.state = {
      selectedType: ''
    };
  }

  selectionHandle = (path, value) => {
    if (value === 'boolean') {
      this.props.updateRootData(this.props.path, false);
    } else {
      this.props.updateRootData(this.props.path, undefined);
    }
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
          path=''
          data={this.state.selectedType}
          uischema={localUISchema}
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

const mapDispatchToEnumFieldProps = dispatch => ({
  updateRootData(path, value) {
    dispatch(update(path, () => value));
  }
});

export default connect(
  mapStateToEnumFieldProps,
  mapDispatchToEnumFieldProps
)(ExpectedValueField);
