/**
 * This file is AUTO GENERATED by [msw-auto-mock](https://github.com/zoubingwu/msw-auto-mock)
 * Feel free to commit/edit it as you need.
 */
/* eslint-disable */
/* tslint:disable */
import { setupWorker, rest } from 'msw';
import { faker } from '@faker-js/faker';
import { setupServer } from 'msw/node';

faker.seed(1);

const baseURL = 'https://test.com';
const MAX_ARRAY_LENGTH = 20;

let i = 0;
const next = () => {
  if (i === Number.MAX_SAFE_INTEGER - 1) {
    i = 0;
  }
  return i++;
};

export const handlers = [
  rest.get(`${baseURL}/test`, (req, res, ctx) => {
    const resultArray = [[ctx.status(200), ctx.json(getGetTest200Response())]];

    return res(...resultArray[next() % resultArray.length]);
  }),
  rest.get(`${baseURL}/test-allof`, (req, res, ctx) => {
    const resultArray = [[ctx.status(200), ctx.json(getGetTestAllof200Response())]];

    return res(...resultArray[next() % resultArray.length]);
  }),
  rest.get(`${baseURL}/test-multiple-responses/:id`, (req, res, ctx) => {
    if (!req.params.id.startsWith('bad')) {
      return res(ctx.status(200), ctx.json(getGetTestMultipleResponsesId200Response()));
    }
    if (req.params.id == 'bad') {
      return res(ctx.status(404), ctx.json(getGetTestMultipleResponsesId404Response()));
    }
    return res(ctx.json(getGetTestMultipleResponsesIddefaultResponse()));
  }),
];

export function getGetTest200Response() {
  return {
    smallNumbers: faker.datatype.number(),
    largeNumbers: faker.datatype.number(),
    tens: faker.datatype.number(),
    listOfNumbers: [...new Array(faker.datatype.number({ min: 1, max: MAX_ARRAY_LENGTH })).keys()].map(_ =>
      faker.datatype.number()
    ),
  };
}

export function getGetTestAllof200Response() {
  return {
    smallNumbers: faker.datatype.number(),
    largeNumbers: faker.datatype.number(),
    tens: faker.datatype.number(),
    listOfNumbers: [...new Array(faker.datatype.number({ min: 1, max: MAX_ARRAY_LENGTH })).keys()].map(_ =>
      faker.datatype.number()
    ),
    shortString: faker.lorem.slug(1),
  };
}

export function getGetTestMultipleResponsesId200Response() {
  return {
    status: 'OK',
  };
}

export function getGetTestMultipleResponsesId404Response() {
  return {
    status: 'Not found',
  };
}

export function getGetTestMultipleResponsesIddefaultResponse() {
  return {
    status: 'Generic error',
  };
}

// This configures a Service Worker with the given request handlers.
export const startWorker = () => {
  const server = setupServer(...handlers);
  server.listen();
};
