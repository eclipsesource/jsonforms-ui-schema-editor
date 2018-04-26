import * as AJV from 'ajv';
import { ErrorObject } from 'ajv';
import { JsonSchema7 } from '@jsonforms/core';
import * as AjvErrors from 'ajv-errors'; // tslint:disable-line

const ajv = new AJV({allErrors: true, verbose: true, jsonPointers: true});
AjvErrors(ajv);

interface ValidationErrors {
  message: string;
  schemaPath?: string;
}

const extractErrors = (errors: ErrorObject[]): ValidationErrors[]  =>
  errors.map((error: ErrorObject) => {
    return {
      message: error.message,
    };
  });

export const validate = (uiMetaSchema: JsonSchema7) => {
  const validator = ajv.compile(uiMetaSchema);
  return (uischema: any) => {
    const valid = validator(uischema);
    if (valid) {
      return [];
    }
    const errors = extractErrors(validator.errors as ErrorObject[]);
    return errors;
  };
};
