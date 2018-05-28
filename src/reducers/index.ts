import { JsonSchema } from '@jsonforms/core';

export const ADD_MODEL_SCHEMA:
  'jsonforms/uiEditor/ADD_MODEL_SCHEMA' = 'jsonforms/uiEditor/ADD_MODEL_SCHEMA';

export interface AddModelSchemaAction {
  type: 'jsonforms/uiEditor/ADD_MODEL_SCHEMA';
  modelSchema: any;
}

const extractModelSchema = state => state.modelSchema;

export const getModelSchema = state => extractModelSchema(state.jsonforms.uiEditor);

export const addModelSchema = (modelSchema): AddModelSchemaAction => {
  return {
    type: ADD_MODEL_SCHEMA,
    modelSchema: modelSchema
  };
};

export interface UIEditorState {
  /**
   * The data schema that can be used alongside the generated UIschema
   */
  modelSchema: JsonSchema;
}

export const uiEditorReducer = (
  state: UIEditorState = {
    modelSchema: {}
  },
  action): UIEditorState => {
  switch (action.type) {
    case ADD_MODEL_SCHEMA:
      if (action.modelSchema === undefined || action.modelSchema === null) {
        return state;
      }
      return {
        modelSchema: action.modelSchema
      };
    default:
      return state;
  }
};
