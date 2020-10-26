import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const DndWrapper = props => <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>;