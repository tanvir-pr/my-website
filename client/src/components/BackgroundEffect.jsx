const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* First gradient layer */}
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-blue-700/60 blur-3xl animate-pulse" />

    {/* Second gradient layer */}
    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-green-400/10 blur-2xl animate-float" />
  </div>
);

export default BackgroundEffect;
