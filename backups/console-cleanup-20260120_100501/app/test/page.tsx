export default function TestPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>ECCCO Platform Test</h1>
      <p>If you can see this, the deployment is working!</p>
      <p>Date: {new Date().toISOString()}</p>
    </div>
  );
}