import { JsonSchema7 } from '@jsonforms/core';

export const SET_MODEL_SCHEMA:
  'jsonforms/uiEditor/SET_MODEL_SCHEMA' = 'jsonforms/uiEditor/SET_MODEL_SCHEMA';

export interface SetModelSchemaAction {
  type: 'jsonforms/uiEditor/SET_MODEL_SCHEMA';
  modelSchema: any;
}

const extractModelSchema = state => state.modelSchema;

export const getModelSchema = state => extractModelSchema(state.jsonforms.uiEditor);

export const setModelSchema = (modelSchema): SetModelSchemaAction => {
  return {
    type: SET_MODEL_SCHEMA,
    modelSchema: modelSchema
  };
};

export interface UIEditorState {
  /**
   * The data schema that can be used alongside the generated UIschema
   */
  modelSchema: JsonSchema7;
}

export const uiEditorReducer = (
  state: UIEditorState = {
    modelSchema: {}
  },
  action): UIEditorState => {
  switch (action.type) {
    case SET_MODEL_SCHEMA:
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
