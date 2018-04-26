/* tslint:disable:max-file-line-count */
import { validate } from '../src/validation';
import * as valid from './exampleUISchemas/validSchemas';
import { uiMetaSchema } from '../src/models/ui-metaschema';
const validator = validate(uiMetaSchema);

test('validates horizontal layout', () => {
  expect(validator(valid.uischemaHorizontalLayout)).toEqual([]);
});

test('validates horizontal layout with rule', () => {
  const uischema = {...valid.uischemaHorizontalLayout, ...valid.schemaRule };
  expect(validator(uischema)).toEqual([]);
});

test('validates vertical layout', () => {
  expect(validator(valid.uischemaVerticalLayout)).toEqual([]);
});

test('validates vertical layout with rule', () => {
  const uischema = {...valid.uischemaVerticalLayout, ...valid.schemaRule };
  expect(validator(uischema)).toEqual([]);
});

test('validates categorization layout and category element', () => {
  expect(validator(valid.uischemaCategorization)).toEqual([]);
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
        ...valid.schemaRule
      }
    ]
  };
  expect(validator(uischema)).toEqual([]);
});

test('validates group layout', () => {
  expect(validator(valid.uischemaGroup)).toEqual([]);
});

test('validates control element', () => {
  expect(validator(valid.uischemaControl)).toEqual([]);
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

  const uischema = {...valid.uischemaHorizontalLayout, ...rule };
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

  const uischema = {...valid.uischemaHorizontalLayout, ...rule };
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

  const uischema = {...valid.uischemaHorizontalLayout, ...rule };
  expect(validator(uischema)).toEqual([]);
});

// TODO add support for boolean type
test.skip('validates control element, label type boolean', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: true,
        scope: '#/properties/occupation'
      }
    ]
  };

  expect(validator(uischema)).toEqual([]);
});

// TODO add support for object type
test('validates control element, label type string', () => {
  expect(validator(valid.uischemaControl)).toEqual([]);
});

test.skip('validates control element, label type object', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: {
          show: true,
          text: 'Occupation'
        },
        scope: '#/properties/occupation'
      }
    ]
  };

  expect(validator(uischema)).toEqual([]);
});

test('validates control element, complex options property', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Occupation',
        scope: '#/properties/occupation',
        options: {
          array: ['Accountant', 'Engineer', 'Freelancer', 'Journalism'],
          boolean: true,
          integer: 1,
          number: 0.1,
          object: {},
          string: 'string'
        }
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors).toEqual([]);
});

test('validates complex uischema', () => {
  expect(validator(valid.uischemaComplex)).toEqual([]);
});

test('invalid control element, layout label must be string', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: ['Occupation'],
        scope: '#/properties/occupation'
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors).not.toEqual([]);
});

test('invalid control element, label object does not allow additional properties', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: {
          show: true,
          text: 'Occupation',
          hide: false
        },
        scope: '#/properties/occupation'
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors).not.toEqual([]);
});

test('invalid vertical layout, layout type does not exist', () => {
  const uischema = {
    elements: [
      {
        type: 'Control',
        scope: '#/properties/name'
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors).not.toEqual([]);
});

test('invalid vertical layout, missing layout elements', () => {
  const uischema = {
    type: 'VerticalLayout'
  };
  const errors = validator(uischema);
  expect(errors).not.toEqual([]);
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
  expect(errors).not.toEqual([]);
});

test('invalid control element, invalid element type', () => {
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
  expect(errors).not.toEqual([]);
});

test('invalid control element, missing element type', () => {
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
  expect(errors).not.toEqual([]);
});

test('invalid control element, missing Control scope', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control'
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors).not.toEqual([]);
});

test('invalid control element, scope does not match pattern', () => {
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
  expect(errors).not.toEqual([]);
});

test('invalid control element, options of Control must be type of object', () => {
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
  expect(errors).not.toEqual([]);
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
  expect(errors).not.toEqual([]);
});

test('invalid rule, missing rule effect', () => {
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
  expect(errors).not.toEqual([]);
});

test('invalid rule, missing rule condition', () => {
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
  expect(errors).not.toEqual([]);
});

test('invalid rule, invalid value for rule effect', () => {
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
  expect(errors).not.toEqual([]);
});

test('invalid rule, type of condition is missing', () => {
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
  expect(errors).not.toEqual([]);
});

test('invalid rule, scope of condition is missing', () => {
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
  expect(errors).not.toEqual([]);
});

test('invalid rule, expected value of condition is missing', () => {
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
  expect(errors).not.toEqual([]);
});

test('invalid rule, condition type must be LEAF', () => {
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
  expect(errors).not.toEqual([]);
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
  expect(errors).not.toEqual([]);
});

test('invalid rule, expected value of condition must be string,integer,number or boolean', () => {
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
  expect(errors).not.toEqual([]);
});

test('invalid categorization layout, root type must be Categorization', () => {
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
  expect(errors).not.toEqual([]);
});

test('invalid categorization layout, Categorization elements must be type of Category', () => {
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
  expect(errors).not.toEqual([]);
});

test('invalid group layout, Group layout must have label', () => {
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
  expect(errors).not.toEqual([]);
});

test('invalid control element, custom error message for missing scope', () => {
  const uischema = {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Occupation',
      }
    ]
  };
  const errors = validator(uischema);
  expect(errors).not.toEqual([]);
  expect(errors[0].message).toEqual(`Control should have an object property "scope"`);
});
