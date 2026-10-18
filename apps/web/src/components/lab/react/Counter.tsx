import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="lab-demo">
      <div className="lab-demo-value">{count}</div>
      <div className="lab-demo-actions">
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => setCount((value) => value - 1)}
        >
          −1
        </button>
        <button
          type="button"
          className="btn btn-vermilion btn-sm"
          onClick={() => setCount((value) => value + 1)}
        >
          +1
        </button>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
      <p className="lab-demo-meta">
        Hydrated with <code>client:visible</code> · React 19
      </p>
    </div>
  );
}
