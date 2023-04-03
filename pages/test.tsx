//@ts-nocheck

import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const nodes = [
  {
    id: '1', // required
    position: { x: 0, y: 0 }, // required
  },
];

function Flow() {
  return (
    <div className="w-full h-full" style={{height: "100vh", width: "100vw"}}>
      <ReactFlow nodes={nodes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
