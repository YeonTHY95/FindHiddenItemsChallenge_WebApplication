//import {setupWorker} from 'msw/browser';
import { handler } from './mswHandler';

import { setupServer } from 'msw/node';

//export const worker = setupWorker(...handler);
export const server = setupServer(...handler);