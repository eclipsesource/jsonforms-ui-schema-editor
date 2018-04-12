export const uiMetaSchema = {
  '$schema': 'http://json-schema.org/draft-07/schema#',
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
          'enum': ['Control']
        },
        'label': {
          '$ref': '#/definitions/label'
        },
        'scope': {
          '$ref': '#/definitions/scope',
        },
        'options': {
          'type': 'object',
          'properties': {
            'additionalProperties': {
              'type': 'string'
            }
          }
        },
        'suggestion': {
          'type': 'array'
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
          'enum': ['Categorization']
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
          'enum': ['Category']
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
          'enum': ['Group']
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
              'enum': ['LEAF']
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
    'label': {
      'type': ['string', 'boolean']
    }
  },
  'additionalProperties': false,
  'required': ['elements', 'type']
};
