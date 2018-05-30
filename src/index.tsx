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
  RankedTester
} from '@jsonforms/core';
import { editorReducer } from '@jsonforms/editor';
import { uiEditorReducer } from './reducers';
import { NonEmptyLayoutRenderer, nonEmptyLayoutTester } from './editor/util/NonEmptyLayout';
import * as JsonRefs from 'json-refs';

const uischema = {
  'type': 'MasterDetailLayout',
  'scope': '#'
};

const renderers: { tester: RankedTester, renderer: any}[] = materialRenderers;
const fields: { tester: RankedTester, field: any}[] = materialFields;

const jsonforms: any = {
  jsonforms: {
    renderers,
    fields,
    editor: {
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
        editor: editorReducer,
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
