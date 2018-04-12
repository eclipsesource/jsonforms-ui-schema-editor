import * as AJV from 'ajv';
import { ErrorObject } from 'ajv';
const ajv = new AJV({allErrors: true, verbose: true});

const extractErrors = (errors: ErrorObject[]): any[] =>
  errors.map((error: any) => {
    return {
      message: error.message,
      schemaPath: error.schemaPath
    };
  });

export const validate = (uiMetaSchema: any) => {
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
