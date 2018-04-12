export const schemaRule = {
  rule: {
    effect: 'HIDE',
    condition: {
      type: 'LEAF' ,
      scope: '#/properties/alive',
      expectedValue: false
    }
  }
};

export const uischemaVerticalLayout = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/name'
    }
  ]
};

export const uischemaHorizontalLayout = {
  type: 'HorizontalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/name'
    }
  ]
};

export const uischemaCategorization = {
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
      ]
    }
  ]
};

export const uischemaGroup = {
  type: 'Group',
  label: 'My Group',
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
};

export const uischemaControl = {
  type: 'HorizontalLayout',
  elements: [
    {
      type: 'Control',
      label: 'Occupation',
      scope: '#/properties/occupation',
      options: {
        'multi': true
      },
      suggestion: [
        'Accountant',
        'Engineer',
        'Freelancer',
        'Journalism',
        'Physician',
        'Student',
        'Teacher',
        'Other'
      ],
      rule: {
        effect: 'DISABLE',
        condition: {
          type: 'LEAF',
          scope: '#/properties/alive',
          expectedValue: false
        }
      }
    }
  ]
};
