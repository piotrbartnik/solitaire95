import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducers } from '../store/reducers';

const store = createStore(reducers);

export const dndWrapper = component => <DndProvider backend={HTML5Backend}>{component}</DndProvider>;

export const reduxWrapper = component => <Provider store={store}>{component}</Provider>