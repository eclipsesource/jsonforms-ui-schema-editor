import { JsonSchema } from './jsonSchema';

export const uiMetaSchema: JsonSchema = {
  '$schema': 'http://json-schema.org/draft-07/schema',
  'type': 'object',
  'properties': {
    'type': {
      'type': 'string',
      'enum': ['HorizontalLayout', 'VerticalLayout', 'Group', 'Categorization']
    },
    'label': {
      'type': 'string'
    },
    'elements': {
      '$ref': '#/definitions/elements'
    },
    'rule': {
      '$ref': '#/definitions/rule'
    }
  },
  'definitions': {
    'elements': {
      'type': 'array',
      'items': {
        'anyOf': [
          { '$ref': '#/definitions/control' },
          { '$ref': '#/definitions/layouts' },
          { '$ref': '#/definitions/categorization' },
          { '$ref': '#/definitions/category' },
          { '$ref': '#/definitions/group' }
        ]
      }
    },
    'control': {
      'type': 'object',
      'properties': {
        'type': {
          'type': 'string',
          'const': 'Control'
        },
        'label': {
          '$ref': '#/definitions/label'
        },
        'scope': {
          '$ref': '#/definitions/scope',
        },
        'options': {
          '$ref': '#/definitions/options'
        },
        'rule': {
          '$ref': '#/definitions/rule'
        }
      },
      'required': ['type', 'scope']
    },
    'layouts': {
      'type': 'object',
      'properties': {
        'type': {
          'type': 'string',
          'enum': ['HorizontalLayout', 'VerticalLayout']
        },
        'elements': {
          '$ref': '#/definitions/elements'
        },
        'rule': {
          '$ref': '#/definitions/rule'
        }
      },
      'required': ['type', 'elements']
    },
    'categorization': {
      'type': 'object',
      'properties': {
        'type': {
          'type': 'string',
          'const': 'Categorization'
        },
        'elements': {
          '$ref': '#/definitions/category'
        },
      },
      'required': ['type', 'elements']
    },
    'category': {
      'type': 'object',
      'properties': {
        'label': {
          'type': 'string'
        },
        'elements': {
          '$ref': '#/definitions/elements'
        },
        'type': {
          'type': 'string',
          'const': 'Category'
        },
        'rule': {
          '$ref': '#/definitions/rule'
        }
      },
      'required': ['type', 'elements']
    },
    'group': {
      'type': 'object',
      'properties': {
        'type': {
          'type': 'string',
          'const': 'Group'
        },
        'elements': {
          '$ref': '#/definitions/elements'
        },
        'label': {
          'type': 'string'
        }
      },
      'required': ['type', 'elements', 'label']
    },
    'rule': {
      'type': 'object',
      'properties': {
        'effect': {
          'type': 'string',
          'enum': ['HIDE', 'SHOW', 'DISABLE', 'ENABLE']
        },
        'condition': {
          'type': 'object',
          'properties': {
            'type': {
              'type': 'string',
              'const': 'LEAF'
            },
            'scope': {
              '$ref': '#/definitions/scope',
            },
            'expectedValue': {
              'type': ['string', 'integer', 'number', 'boolean']
            }
          },
          'required': ['type', 'scope', 'expectedValue']
        }
      },
      'required': ['effect', 'condition']
    },
    'scope': {
      'type': 'string',
      'pattern': '^#\\/properties\\/{1}'
    },
    'labelObject': {
      'type': 'object',
      'properties': {
        'text': {
          'type': 'string'
        },
        'show': {
          'type': 'boolean'
        }
      },
      'additionalProperties': false
    },
    'label': {
      'anyOf': [
        {
          'type': 'string'
        },
        {
          'type': 'boolean'
        },
        {
          '$ref': '#/definitions/labelObject'
        }
      ]
    },
    'options': {
      'type': 'object',
      'additionalProperties': true
    }
  },
  'additionalProperties': false,
  'required': ['elements', 'type']
};
