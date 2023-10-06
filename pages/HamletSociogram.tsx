import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
} from 'reactflow';

import 'reactflow/dist/style.css';

let initialElements = [
  { id: 'hamlet', data: { label: 'Hamlet' }, position: { x: 100, y: 100 }, style: { background: '#ff0000' } },
  { id: 'ghost', data: { label: 'Ghost (Hamlet Sr.)' }, position: { x: 0, y: -100 }, style: { background: '#00ff00' } },
  { id: 'claudius', data: { label: 'Claudius' }, position: { x: 100, y: -200 }, style: { background: '#0000ff' } },
  { id: 'gertrude', data: { label: 'Gertrude' }, position: { x: 150, y: -100 }, style: { background: '#ffff00' } },
  { id: 'polonius', data: { label: 'Polonius' }, position: { x: 400, y: -100 }, style: { background: '#ff00ff' } },
  { id: 'ophelia', data: { label: 'Ophelia' }, position: { x: 200, y: 100 }, style: { background: '#00ffff' } },
  { id: 'laertes', data: { label: 'Laertes' }, position: { x: 300, y: 200 }, style: { background: '#ff9900' } },
  { id: 'horatio', data: { label: 'Horatio' }, position: { x: 0, y: 200 }, style: { background: '#9900ff' } },
  { id: 'rosencrantz', data: { label: 'Rosencrantz' }, position: { x: 100, y: 300 }, style: { background: '#99ff00' } },
  { id: 'gildenstern', data: { label: 'Gildenstern' }, position: { x: 200, y: 300 }, style: { background: '#0099ff' } },
  { id: 'fortinbras', data: { label: 'Fortinbras' }, position: { x: -100, y: 150 }, style: { background: '#ff0099' } },
  { id: 'fortinbrasSr', data: { label: 'Fortinbras Sr.' }, position: { x: -100, y: 100 }, style: { background: '#99ff99' } },
  { id: 'oldNorway', data: { label: 'Old Norway' }, position: { x: -200, y: 100 }, style: { background: '#990099' } },
];

const initialEdges: Array<Edge> = [
  { id: 'hamlet-ghost', source: 'ghost', target: 'hamlet', label: "The Ghost of Hamlet's Father, who reveals how he actually died"},
  { id: 'ghost-fortinbrasSr', source: 'ghost', target: 'fortinbrasSr', label: "Murderer of Fortinbras Sr."},
  { id: 'hamlet-claudius', source: 'claudius', target: 'hamlet', label: "Hamlet's Uncle" },
  { id: 'hamlet-gertrude', source: 'gertrude', target: 'hamlet', label: "Hamlet's Mother"},
  { id: 'ghost-gertrude', source: 'ghost', target: 'gertrude', label: "Former Wife"},
  { id: 'claudius-gertrude', source: 'claudius', target: 'gertrude', label: "Husband and Wife"},
  { id: 'claudius-polonius', source: 'claudius', target: 'polonius', label: "Advisor to the king"},
  { id: 'claudius-ghost', source: 'claudius', target: 'ghost', label: "Murderer of Hamlet Sr."},
  { id: 'hamlet-ophelia', source: 'hamlet', target: 'ophelia', label: "Hamlet's girlfriend"},
  { id: 'laertes-ophelia', source: 'laertes', target: 'ophelia', label: "Siblings"},
  { id: 'polonius-laertes', source: 'polonius', target: 'laertes', label: "Father of Laertes" },
  { id: 'hamlet-horatio', source: 'hamlet', target: 'horatio', label: "Hamlet's best friend" },
  { id: 'hamlet-rosencrantz', source: 'hamlet', target: 'rosencrantz', label: "Childhood friend of Hamlet" },
  { id: 'gildenstern-rosencrantz', source: 'gildenstern', target: 'rosencrantz', label: "Childhood friends" },
  { id: 'hamlet-gildenstern', source: 'hamlet', target: 'gildenstern', label: "Childhood friend of Hamlet" },
  { id: 'hamlet-fortinbras', source: 'hamlet', target: 'fortinbras', label: "Wants revenge for the stolen land" },
  { id: 'fortinbras-fortinbrasSr', source: 'fortinbrasSr', target: 'fortinbras', label: "Father of Fortinbras Jr." },
  { id: 'fortinbras-oldNorway', source: 'oldNorway', target: 'fortinbras', label: "Uncle of Fortinbras Jr." },
];

const formatNodes = () => {
  let nodes = [];
  initialElements.forEach((node) => {
    node.position.x = node.position.x * 4;
    node.position.y = node.position.y * 4;
    nodes.push(node);
  });
  return nodes;
}

const formatEdges = () => {
  let edges = [];
  initialEdges.forEach((edge) => {
    edge.animated = true;
    edge.type = "default";

    edges.push(edge);
  });

  return edges;
}

const HamletSociogram = () => {


  const [nodes, setNodes, onNodesChange] = useNodesState(formatNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(formatEdges());

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{ width: '100vw', height: '90vh' }}>
      <div className='justify-center flex m-4' >
        <h1 className="text-3xl rotating-border rotating-border--ha hover:rotating-border--google" > Mateo&apos;s Sociogram of Hamlet </h1>
      </div>
      <ReactFlow nodes={initialElements} edges={edges} onConnect={onConnect} onNodesChange={onNodesChange}>
        <Controls />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div >
  );
};

export default HamletSociogram;
