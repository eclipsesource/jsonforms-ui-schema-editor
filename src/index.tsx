import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, Store } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import { imageProvider, labelProvider, modelMapping } from './config';
import { uiMetaSchema } from './models/ui-metaschema';
import { materialFields, materialRenderers } from '@jsonforms/material-renderers';
import {
  Actions,
  jsonformsReducer,
  JsonSchema7,
  RankedTester
} from '@jsonforms/core';
import {
  findAllContainerProperties,
  Property,
  setContainerProperties,
  treeWithDetailReducer
} from '@jsonforms/material-tree-renderer';
import { uiEditorReducer } from './reducers';
import NonEmptyLayoutRenderer, { nonEmptyLayoutTester } from './editor/util/NonEmptyLayout';
import ExpectedValueField, {
  ExpectedValueFieldTester
} from './editor/util/ExpectedValueField';
import * as JsonRefs from 'json-refs';
import * as _ from 'lodash';

export interface LabelDefinition {
  /** A constant label value displayed for every object for which this label definition applies. */
  constant?: string;
  /** The property name that is used to get a variable part of an object's label. */
  property?: string;
}

const uischema = {
  'type': 'MasterDetailLayout',
  'scope': '#'
};

export const filterPredicate = (data: Object) => {
  return (property: Property): boolean => {
    if (!_.isEmpty(modelMapping) &&
      !_.isEmpty(modelMapping.mapping)) {
      if (data[modelMapping.attribute]) {
        return property.schema.$id === modelMapping.mapping[data[modelMapping.attribute]];
      }
      return true;
    }

    return false;
  };
};

export const calculateLabel =
  (schema: JsonSchema7) => (element: Object): string => {

    if (!_.isEmpty(labelProvider) && labelProvider[schema.$id] !== undefined) {

      if (typeof labelProvider[schema.$id] === 'string') {
        // To be backwards compatible: a simple string is assumed to be a property name
        return element[labelProvider[schema.$id]];
      }
      if (typeof labelProvider[schema.$id] === 'object') {
        const info = labelProvider[schema.$id] as LabelDefinition;
        let label;
        if (info.constant !== undefined) {
          label = info.constant;
        }
        if (!_.isEmpty(info.property) && !_.isEmpty(element[info.property])) {
          label = _.isEmpty(label) ?
            element[info.property] :
            `${label} ${element[info.property]}`;
        }
        if (label !== undefined) {
          return label;
        }
      }
    }

    const namingKeys = Object
      .keys(schema.properties)
      .filter(key => key === '$id' || key === 'name');
    if (namingKeys.length !== 0) {
      return element[namingKeys[0]];
    }

    return JSON.stringify(element);
  };

export const imageGetter = (schemaId: string) =>
  !_.isEmpty(imageProvider) ? `icon ${imageProvider[schemaId]}` : '';

const renderers: { tester: RankedTester, renderer: any}[] = materialRenderers;
const fields: { tester: RankedTester, field: any}[] = materialFields;

const jsonforms: any = {
  jsonforms: {
    renderers,
    fields,
    treeWithDetail: {
      imageMapping: imageProvider,
      labelMapping: labelProvider,
      modelMapping,
      uiSchemata: {}
    },
    uiEditor: {
      modelSchema: {}
    }
  }
};

const store: Store<any> = createStore(
  combineReducers({
    jsonforms: jsonformsReducer(
      {
        treeWithDetail: treeWithDetailReducer,
        uiEditor: uiEditorReducer
      }
    )
  }
  ),
  {
    ...jsonforms
  }
);

JsonRefs.resolveRefs(uiMetaSchema)
  .then(
    resolvedSchema => {
      store.dispatch(Actions.init({}, resolvedSchema.resolved, uischema));

      store.dispatch(Actions.registerRenderer(nonEmptyLayoutTester, NonEmptyLayoutRenderer));

      store.dispatch(Actions.registerField(ExpectedValueFieldTester, ExpectedValueField));

      store.dispatch(setContainerProperties(findAllContainerProperties(resolvedSchema.resolved,
                                                                       resolvedSchema.resolved)));

      ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById('app'));
      registerServiceWorker();
    },
    err => {
      console.log(err.stack);
    });
