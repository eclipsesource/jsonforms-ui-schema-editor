/* tslint:disable:max-file-line-count */

import { validate } from '../src/validation';
import {
  schemaRule,
  uischemaCategorization,
  uischemaControl,
  uischemaGroup,
  uischemaHorizontalLayout,
  uischemaVerticalLayout
} from './exampleUISchemas/validSchemas';
import { uiMetaSchema } from '../src/ui-metaschema';
import * as _ from 'lodash';
const validator = validate(uiMetaSchema);

test('validates horizontal layout', () => {
  expect(validator(uischemaHorizontalLayout)).toEqual([]);
});

test('validates horizontal layout with rule', () => {
  const uischema = {...uischemaHorizontalLayout, ...schemaRule };
  expect(validator(uischema)).toEqual([]);
});

test('validates vertical layout', () => {
  expect(validator(uischemaVerticalLayout)).toEqual([]);
});

test('validates vertical layout with rule', () => {
  const uischema = {...uischemaVerticalLayout, ...schemaRule };
  expect(validator(uischema)).toEqual([]);
});

test('validates categorization layout and category element', () => {
  expect(validator(uischemaCategorization)).toEqual([]);
});

test('validates categorization layout and category element with rule', () => {
  const uischema = {
    type: 'Categorization',
    elements: [
      {
        type: 'Category',
        label: 'Private',
        elements: [
          {
            type: 'Control',
            label: 'Test',
            scope: '#/properties/name'
          }
        ],
        ...schemaRule
      }
    ]
  };
  expect(validator(uischema)).toEqual([]);
});

test('validates group layout', () => {
  expect(validator(uischemaGroup)).toEqual([]);
});

test('validates control element', () => {
  expect(validator(uischemaControl)).toEqual([]);
});

test('validates SHOW effect of rule', () => {
  const rule = {
    rule: {
      effect: 'SHOW',
      condition: {
        type: 'LEAF' ,
        scope: '#/properties/alive',
        expectedValue: false
      }
    }
  };

  const uischema = {...uischemaHorizontalLayout, ...rule };
  expect(validator(uischema)).toEqual([]);
});

test('validates DISABLE effect of rule', () => {
  const rule = {
    rule: {
      effect: 'DISABLE',
      condition: {
        type: 'LEAF' ,
        scope: '#/properties/alive',
        expectedValue: false
      }
    }
  };

  const uischema = {...uischemaHorizontalLayout, ...rule };
  expect(validator(uischema)).toEqual([]);
});

test('validates ENABLE effect of rule', () => {
  const rule = {
    rule: {
      effect: 'ENABLE',
      condition: {
        type: 'LEAF' ,
        scope: '#/properties/alive',
        expectedValue: false
      }
    }
  };

  const uischema = {...uischemaHorizontalLayout, ...rule };
  expect(validator(uischema)).toEqual([]);
});

test('invalid vertical layout, missing type', () => {
  const uischema = {
    elements: [
      {
        type: 'Control',
        scope: '#/properties/name'
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should have required property \'type\'');
});

test('invalid vertical layout, missing elements', () => {
  const uischema = {
    type: 'VerticalLayout'
  };
  expect(validator(uischema)[0].message).toEqual('should have required property \'elements\'');
});

test('invalid vertical layout, missing both type and elements', () => {
  const uischema = {};
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should have required property \'type\'');
  expect(errors[1].message).toEqual('should have required property \'elements\'');
});

test('invalid layout type', () => {
  const uischema = {
    type: 'TestLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/name'
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should be equal to one of the allowed values');
});

test('invalid control element, invalid type', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Test',
        label: 'Occupation',
        scope: '#/properties/occupation'
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should be equal to one of the allowed values');
});

test('invalid control element, missing type', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        label: 'Occupation',
        scope: '#/properties/occupation'
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should have required property \'type\'');
});

test('invalid control element, missing scope', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control'
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should have required property \'scope\'');
});

test('invalid control element, invalid scope', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        scope: 'properties/occupation'
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should match pattern "^#\\/properties\\/{1}"');
});

test('invalid control element, invalid options type', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Occupation',
        scope: '#/properties/occupation',
        options: 'multi'
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should be object');
});

test('invalid control element, invalid suggestion type', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Occupation',
        scope: '#/properties/occupation',
        suggestion: {
          Accountant: 'Accountant',
          Engineer: 'Engineer',
          Freelancer: 'Freelancer',
          Journalism: 'Journalism'
        }
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should be array');
});

test('invalid control element, invalid label', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: {
          label: 'Occupation'
        },
        scope: '#/properties/occupation'
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should be string,boolean');
});

test('invalid rule, missing effect', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Occupation',
        scope: '#/properties/occupation',
        rule: {
          condition: {
            type: 'LEAF',
            scope: '#/properties/alive',
            expectedValue: false
          }
        }
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should have required property \'effect\'');
});

test('invalid rule, missing condition', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Occupation',
        scope: '#/properties/occupation',
        rule: {
          effect: 'DISABLE'
        }
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should have required property \'condition\'');
});

test('invalid rule, invalid effect value', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Occupation',
        scope: '#/properties/occupation',
        rule: {
          effect: 'Test',
          condition: {
            type: 'LEAF',
            scope: '#/properties/alive',
            expectedValue: false
          }
        }
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should be equal to one of the allowed values');
});

test('invalid rule, missing type of condition', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Occupation',
        scope: '#/properties/occupation',
        rule: {
          effect: 'HIDE',
          condition: {
            scope: '#/properties/alive',
            expectedValue: false
          }
        }
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should have required property \'type\'');
});

test('invalid rule, missing scope of condition', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Occupation',
        scope: '#/properties/occupation',
        rule: {
          effect: 'HIDE',
          condition: {
            type: 'LEAF',
            expectedValue: false
          }
        }
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should have required property \'scope\'');
});

test('invalid rule, missing expected value of condition', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Occupation',
        scope: '#/properties/occupation',
        rule: {
          effect: 'HIDE',
          condition: {
            type: 'LEAF',
            scope: '#/properties/alive'
          }
        }
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should have required property \'expectedValue\'');
});

test('invalid rule, invalid condition type', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Occupation',
        scope: '#/properties/occupation',
        rule: {
          effect: 'HIDE',
          condition: {
            type: 'Test',
            scope: '#/properties/alive',
            expectedValue: false
          }
        }
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should be equal to one of the allowed values');
});

test('invalid rule, invalid effect value', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Occupation',
        scope: '#/properties/occupation',
        rule: {
          effect: 'Test',
          condition: {
            type: 'LEAF',
            scope: '#/properties/alive',
            expectedValue: true
          }
        }
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should be equal to one of the allowed values');
});

test('invalid rule, invalid expected value of condition', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Occupation',
        scope: '#/properties/occupation',
        rule: {
          effect: 'HIDE',
          condition: {
            type: 'LEAF',
            scope: '#/properties/alive',
            expectedValue: ['test']
          }
        }
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should be string,integer,number,boolean');
});

test('invalid categorization layout, invalid type', () => {
  const uischema = {
    type: 'Test',
    elements: [
      {
        type: 'Category',
        label: 'Private',
        elements: [
          {
            type: 'Control',
            label: 'Test',
            scope: '#/properties/name'
          }
        ]
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should be equal to one of the allowed values');
});

test('invalid categorization layout, invalid element type', () => {
  const uischema = {
    type: 'Categorization',
    elements: [
      {
        type: 'Test',
        label: 'Private',
        elements: [
          {
            type: 'Control',
            label: 'Test',
            scope: '#/properties/name'
          }
        ]
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors[0].message).toEqual('should be equal to one of the allowed values');
});

test('invalid group layout, missing label', () => {
  const uischema = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Group',
        elements: [
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                label: 'Name',
                scope: '#/properties/name'
              }
            ]
          },
        ]
      }
    ]
  };
  const errors = validator(uischema);
  const error = _.find(errors, { 'message': 'should have required property \'label\'' });
  expect(error.message).toEqual('should have required property \'label\'');
});
