/**
 * @flow
 * @relayHash 478db9f32609e0077ba46af8b73125e1
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type LoginContainerMutationVariables = {|
  input: {
    email: string;
    password: string;
    clientMutationId?: ?string;
  };
|};
export type LoginContainerMutationResponse = {|
  +LoginEmail: ?{|
    +token: ?string;
    +error: ?string;
    +clientMutationId: ?string;
  |};
|};
*/


/*
mutation LoginContainerMutation(
  $input: LoginEmailInput!
) {
  LoginEmail(input: $input) {
    token
    error
    clientMutationId
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "LoginEmailInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginContainerMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "LoginEmailInput!"
          }
        ],
        "concreteType": "LoginEmailPayload",
        "name": "LoginEmail",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "token",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "error",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "clientMutationId",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "LoginContainerMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "LoginEmailInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "LoginContainerMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "LoginEmailInput!"
          }
        ],
        "concreteType": "LoginEmailPayload",
        "name": "LoginEmail",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "token",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "error",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "clientMutationId",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation LoginContainerMutation(\n  $input: LoginEmailInput!\n) {\n  LoginEmail(input: $input) {\n    token\n    error\n    clientMutationId\n  }\n}\n"
};

module.exports = batch;
